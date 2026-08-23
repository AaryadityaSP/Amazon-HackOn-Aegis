// src/controller/productController.js
// Product listing with AI Image Integrity Analysis

const { v4: uuidv4 } = require('uuid');
const { dynamoDB, s3 } = require('../config/aws');
const { analyzeImage } = require('../services/imageAnalyzer');
const { processEvent } = require('../services/trustEngine');

/**
 * Get pre-signed S3 URL for reading
 */
const getSignedUrl = (bucket, key) => {
  return s3.getSignedUrl('getObject', {
    Bucket: bucket,
    Key: key,
    Expires: 60 * 60
  });
};

/**
 * POST /api/products
 * Add a new product listing with AI image analysis
 */
exports.addProduct = async (req, res) => {
  console.log('\n🚀 ═══ NEW PRODUCT LISTING ═══');

  try {
    const { name, price, description, category, stock } = req.body;
    const image = req.file;
    const sellerId = req.user?.uid || req.body.sellerId || 'demo-seller-001';

    // 1. Validate input
    if (!image || !name || !price || !description || !category || !stock) {
      console.error('❌ Validation failed: Missing fields');
      return res.status(400).json({ error: 'All fields including image are required' });
    }

    console.log(`   📦 Product: ${name} | Seller: ${sellerId}`);

    // 2. Upload image to S3
    console.log('   📤 Uploading image to S3...');
    const imageKey = `products/${sellerId}/${uuidv4()}_${image.originalname}`;
    const s3Bucket = process.env.S3_BUCKET || 'aegis-seller-uploads';

    const s3UploadResult = await s3.upload({
      Bucket: s3Bucket,
      Key: imageKey,
      Body: image.buffer,
      ContentType: image.mimetype
    }).promise();
    console.log('   ✅ S3 upload successful');

    // 3. Run AI Image Integrity Analysis (replaces simple Roboflow call)
    console.log('   🧠 Running Aegis Image Integrity Analysis...');
    const imageAnalysis = await analyzeImage(image.buffer, image.originalname);
    console.log(`   🎯 Image Integrity Score: ${imageAnalysis.imageIntegrityScore}/100`);

    if (imageAnalysis.flagged) {
      console.log(`   🚩 IMAGE FLAGGED: ${imageAnalysis.flagReasons.join(', ')}`);
    }

    // 4. Generate pre-signed URL
    const signedImageUrl = getSignedUrl(s3Bucket, imageKey);

    // 5. Prepare product data
    const productData = {
      productId: uuidv4(),
      sellerId,
      name,
      price: parseFloat(price),
      description,
      category,
      stock: parseInt(stock, 10),
      imageUrl: s3UploadResult.Location,
      imageKey,
      signedImageUrl,
      // Aegis AI scores
      imageIntegrityScore: imageAnalysis.imageIntegrityScore,
      imageAnalysis: {
        ela: imageAnalysis.checks.ela,
        metadata: imageAnalysis.checks.metadata,
        quality: imageAnalysis.checks.quality,
        duplicateDetection: {
          hash: imageAnalysis.checks.duplicateDetection?.hash,
          isDuplicate: imageAnalysis.checks.duplicateDetection?.isDuplicate
        }
      },
      flagged: imageAnalysis.flagged,
      flagReasons: imageAnalysis.flagReasons,
      status: imageAnalysis.flagged ? 'under_review' : 'active',
      createdAt: new Date().toISOString()
    };

    // 6. Save to DynamoDB
    console.log('   💾 Saving to DynamoDB...');
    await dynamoDB.put({
      TableName: 'SellerListings',
      Item: productData
    }).promise();
    console.log('   ✅ Product saved successfully');

    // 7. Process trust engine event
    const trustUpdate = processEvent('LISTING_CREATED', {
      productId: productData.productId,
      sellerId,
      imageIntegrityScore: imageAnalysis.imageIntegrityScore,
      flagged: imageAnalysis.flagged
    });

    // 8. Emit real-time events
    const io = req.app.get('io');
    if (io) {
      io.emit('LISTING_CREATED', {
        productId: productData.productId,
        name,
        sellerId,
        imageIntegrityScore: imageAnalysis.imageIntegrityScore,
        flagged: imageAnalysis.flagged,
        timestamp: new Date().toISOString()
      });

      if (imageAnalysis.flagged) {
        io.emit('LISTING_FLAGGED', {
          productId: productData.productId,
          reasons: imageAnalysis.flagReasons,
          timestamp: new Date().toISOString()
        });
      }

      if (trustUpdate) {
        io.emit('SCORE_UPDATED', trustUpdate);
      }
    }

    // 9. If flagged, create a flag record
    if (imageAnalysis.flagged) {
      try {
        await dynamoDB.put({
          TableName: 'Flags',
          Item: {
            flagId: uuidv4(),
            type: 'listing',
            targetId: productData.productId,
            sellerId,
            severity: imageAnalysis.imageIntegrityScore < 30 ? 'high' : 'medium',
            reasons: imageAnalysis.flagReasons,
            score: imageAnalysis.imageIntegrityScore,
            status: 'pending',
            createdAt: new Date().toISOString()
          }
        }).promise();
      } catch (e) {
        console.warn('⚠️ Could not save flag record:', e.message);
      }
    }

    console.log(`   ✅ Listing complete! Status: ${productData.status}\n`);

    res.status(201).json({
      success: true,
      product: {
        productId: productData.productId,
        name: productData.name,
        imageUrl: productData.imageUrl,
        imageIntegrityScore: productData.imageIntegrityScore,
        flagged: productData.flagged,
        flagReasons: productData.flagReasons,
        status: productData.status
      },
      imageAnalysis: imageAnalysis.checks
    });

  } catch (error) {
    console.error('❌ Error in addProduct:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

/**
 * GET /api/products/:productId
 * Get a single product with its analysis data
 */
exports.getProduct = async (req, res) => {
  try {
    const result = await dynamoDB.get({
      TableName: 'SellerListings',
      Key: { productId: req.params.productId }
    }).promise();

    if (!result.Item) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ success: true, product: result.Item });
  } catch (error) {
    console.error('❌ Get product error:', error);
    res.status(500).json({ error: 'Failed to get product' });
  }
};

/**
 * GET /api/products/seller/:sellerId
 * Get all products for a seller
 */
exports.getSellerProducts = async (req, res) => {
  try {
    const result = await dynamoDB.query({
      TableName: 'SellerListings',
      IndexName: 'SellerIndex',
      KeyConditionExpression: 'sellerId = :sid',
      ExpressionAttributeValues: { ':sid': req.params.sellerId }
    }).promise();

    res.json({ success: true, products: result.Items || [] });
  } catch (error) {
    console.error('❌ Get seller products error:', error);
    res.json({ success: true, products: [] });
  }
};
