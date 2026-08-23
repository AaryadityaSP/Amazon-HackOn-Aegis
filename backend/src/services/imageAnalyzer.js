const sharp = require('sharp');
const blockhash = require('blockhash-core');
const {
    RekognitionClient,
    DetectLabelsCommand,
    DetectModerationLabelsCommand,
    DetectTextCommand
} = require('@aws-sdk/client-rekognition');

// In-memory duplicate storage for demo purposes
const imageHashMap = new Map();

// AWS Rekognition Client setup
const rekClient = new RekognitionClient({ region: 'ap-south-1' });

/**
 * Calculate Hamming distance between two hex hashes
 */
function calculateHammingDistance(hash1, hash2) {
    if (!hash1 || !hash2 || hash1.length !== hash2.length) return 999;
    let distance = 0;
    for (let i = 0; i < hash1.length; i++) {
        if (hash1[i] !== hash2[i]) {
            distance++;
        }
    }
    return distance;
}

/**
 * Generate perceptual hash using blockhash-core
 */
async function generateHash(imageBuffer) {
    try {
        const { data, info } = await sharp(imageBuffer)
            .resize(256, 256, { fit: 'fill' })
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });

        // blockhash-core expects { width, height, data }
        const hash = blockhash.bmdata({ width: info.width, height: info.height, data: data }, 16);
        return hash;
    } catch (error) {
        console.error('❌ Error generating image hash:', error.message);
        return null;
    }
}

/**
 * ELA (Error Level Analysis)
 */
async function performELA(imageBuffer) {
    try {
        console.log('🔍 Running Error Level Analysis (ELA)...');
        // Resave at quality 90
        const resavedBuffer = await sharp(imageBuffer)
            .jpeg({ quality: 90 })
            .toBuffer();

        // Calculate difference using composite
        const diffData = await sharp(imageBuffer)
            .composite([{ input: resavedBuffer, blend: 'difference' }])
            .raw()
            .toBuffer();

        let totalError = 0;
        for (let i = 0; i < diffData.length; i++) {
            totalError += diffData[i];
        }
        
        let averageError = totalError / diffData.length;
        averageError = averageError * 15; // Amplify by factor of 15

        const suspicious = averageError > 8.0;
        let score = 100 - (averageError * 2);
        if (score < 0) score = 0;
        if (score > 100) score = 100;

        console.log(`📊 ELA Result: Avg Error=${averageError.toFixed(2)}, Suspicious=${suspicious}`);

        return {
            score: Math.round(score),
            suspicious,
            averageError
        };
    } catch (error) {
        console.error('❌ ELA check failed:', error.message);
        return { score: 100, suspicious: false, averageError: 0 };
    }
}

/**
 * Metadata Integrity Check
 */
async function analyzeMetadata(metadata) {
    console.log('📸 Analyzing image metadata...');
    let score = 100;
    const flags = [];
    let software = null;
    let hasCamera = false;
    let suspicious = false;

    if (!metadata.exif) {
        flags.push('Metadata completely stripped or missing EXIF');
        score -= 40;
        suspicious = true;
    } else {
        const exifString = metadata.exif.toString('ascii').toLowerCase();
        
        if (exifString.includes('photoshop') || exifString.includes('gimp') || exifString.includes('ai ')) {
            flags.push('Suspicious software found in metadata (Photoshop/GIMP/AI)');
            score -= 50;
            software = 'Manipulation Software Detected';
            suspicious = true;
        }

        // Basic check for camera make/model typical fields
        if (exifString.includes('make') || exifString.includes('model')) {
            hasCamera = true;
        } else {
            flags.push('No camera Make/Model found (suspicious for product photos)');
            score -= 20;
            suspicious = true;
        }
    }

    if (score < 0) score = 0;
    
    console.log(`📋 Metadata Check: Score=${score}, Suspicious=${suspicious}`);

    return {
        score,
        software,
        hasCamera,
        suspicious,
        flags
    };
}

/**
 * Quality Metrics Check
 */
async function analyzeQuality(metadata, stats) {
    console.log('📐 Analyzing image quality & entropy...');
    let score = 100;
    let sharpness = 'Normal';
    
    const resolution = { w: metadata.width || 0, h: metadata.height || 0 };
    const entropy = stats.entropy || 0;

    if (resolution.w < 300 || resolution.h < 300) {
        score -= 30;
    }

    if (entropy < 4.0) {
        score -= 40; // Low entropy often means generated, solid colors, or very low quality
        sharpness = 'Low/Stock';
    } else if (entropy > 7.5) {
        sharpness = 'High/Sharp';
    }

    if (score < 0) score = 0;

    console.log(`✨ Quality Check: Entropy=${entropy.toFixed(2)}, Res=${resolution.w}x${resolution.h}`);

    return {
        score,
        resolution,
        entropy,
        sharpness
    };
}

/**
 * AWS Rekognition Check
 */
async function callRekognition(imageBuffer) {
    console.log('☁️ Calling AWS Rekognition...');
    const result = {
        labels: [],
        moderationLabels: [],
        textDetections: []
    };

    try {
        const params = {
            Image: { Bytes: imageBuffer }
        };

        // 1. Detect Labels
        const labelsCmd = new DetectLabelsCommand({ ...params, MaxLabels: 10 });
        const labelsRes = await rekClient.send(labelsCmd);
        if (labelsRes.Labels) {
            result.labels = labelsRes.Labels.map(l => ({ Name: l.Name, Confidence: l.Confidence }));
        }

        // 2. Detect Moderation Labels
        const modCmd = new DetectModerationLabelsCommand(params);
        const modRes = await rekClient.send(modCmd);
        if (modRes.ModerationLabels) {
            result.moderationLabels = modRes.ModerationLabels.map(m => ({ Name: m.Name, Confidence: m.Confidence }));
        }

        // 3. Detect Text
        const textCmd = new DetectTextCommand(params);
        const textRes = await rekClient.send(textCmd);
        if (textRes.TextDetections) {
            result.textDetections = textRes.TextDetections.map(t => ({ DetectedText: t.DetectedText, Confidence: t.Confidence }));
        }

        console.log(`✅ AWS Rekognition Success: ${result.labels.length} labels found.`);
    } catch (error) {
        console.error('❌ AWS Rekognition failed:', error.message);
    }

    return result;
}

/**
 * Main Analyze Image Function
 * @param {Buffer} imageBuffer - Raw image buffer
 * @param {string} originalFilename - Name of the uploaded file
 * @returns {Object} Analysis results
 */
async function analyzeImage(imageBuffer, originalFilename) {
    console.log(`\n🚀 Starting Image Analysis for: ${originalFilename}`);
    
    const results = {
        imageIntegrityScore: 100,
        checks: {
            ela: { score: 100, suspicious: false, averageError: 0 },
            duplicateDetection: { hash: null, isDuplicate: false, matchedProductId: null },
            metadata: { score: 100, software: null, hasCamera: false, suspicious: false, flags: [] },
            quality: { score: 100, resolution: { w: 0, h: 0 }, entropy: 0, sharpness: 'Normal' },
            rekognition: { labels: [], moderationLabels: [], textDetections: [] }
        },
        flagged: false,
        flagReasons: []
    };

    try {
        const image = sharp(imageBuffer);
        const metadata = await image.metadata();
        const stats = await image.stats();

        // 1. ELA (Error Level Analysis)
        results.checks.ela = await performELA(imageBuffer);
        if (results.checks.ela.suspicious) {
            results.flagReasons.push('ELA indicates possible manipulation (high error rate).');
        }

        // 2. Metadata Integrity
        results.checks.metadata = await analyzeMetadata(metadata);
        if (results.checks.metadata.suspicious) {
            results.flagReasons.push(...results.checks.metadata.flags);
        }

        // 3. Quality Metrics
        results.checks.quality = await analyzeQuality(metadata, stats);
        if (results.checks.quality.score < 80) {
            results.flagReasons.push('Low image quality or unnatural entropy (possible stock/generated).');
        }

        // 4. Duplicate Detection (Perceptual Hash)
        console.log('👯 Checking for duplicates...');
        const hash = await generateHash(imageBuffer);
        let isDuplicate = false;
        let matchedProductId = null;

        if (hash) {
            // Compare against in-memory map
            for (const [existingId, existingHash] of imageHashMap.entries()) {
                const distance = calculateHammingDistance(hash, existingHash);
                if (distance <= 6) {
                    isDuplicate = true;
                    matchedProductId = existingId;
                    break;
                }
            }
            
            // Store it for future checks
            if (!isDuplicate) {
                const newId = `prod_${Date.now()}`;
                imageHashMap.set(newId, hash);
            }
        }
        
        results.checks.duplicateDetection = {
            hash: hash || 'failed',
            isDuplicate,
            matchedProductId
        };

        if (isDuplicate) {
            results.flagReasons.push(`Image is a duplicate of product: ${matchedProductId}`);
        }

        // 5. AWS Rekognition
        results.checks.rekognition = await callRekognition(imageBuffer);
        if (results.checks.rekognition.moderationLabels.length > 0) {
            results.flagReasons.push('Inappropriate content detected by AWS Rekognition.');
        }

        // Calculate Overall Weighted Score
        const dupScore = isDuplicate ? 0 : 100;
        let rekScore = 100; // Default high unless moderation fails or low label confidence
        
        if (results.checks.rekognition.moderationLabels.length > 0) {
            rekScore = 0;
        } else if (results.checks.rekognition.labels.length > 0) {
            const sumConf = results.checks.rekognition.labels.reduce((acc, l) => acc + l.Confidence, 0);
            rekScore = sumConf / results.checks.rekognition.labels.length;
        }

        const finalScore = 
            (results.checks.ela.score * 0.25) +
            (results.checks.metadata.score * 0.20) +
            (results.checks.quality.score * 0.20) +
            (rekScore * 0.25) +
            (dupScore * 0.10);

        results.imageIntegrityScore = Math.round(finalScore);

        // Flag if score < 50 OR any critical issue found
        if (results.imageIntegrityScore < 50 || results.flagReasons.length > 0) {
            results.flagged = true;
        }

        console.log(`🏁 Analysis Complete! Integrity Score: ${results.imageIntegrityScore}/100, Flagged: ${results.flagged}`);
        
    } catch (error) {
        console.error('❌ Critical error during image analysis:', error);
        results.flagReasons.push(`Analysis failed: ${error.message}`);
        results.flagged = true;
        results.imageIntegrityScore = 0;
    }

    return results;
}

module.exports = {
    analyzeImage
};
