// src/routes/reviewRoutes.js
// Review submission and analysis endpoints

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { analyzeReview } = require('../services/reviewAnalyzer');
const { processEvent } = require('../services/trustEngine');
const { dynamoDB, s3 } = require('../config/aws');
const { verifyToken } = require('../middleware/auth');

// Multer config for audio uploads (in-memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

/**
 * POST /api/reviews/text
 * Submit a text review with AI fraud analysis
 */
router.post('/text', verifyToken, async (req, res) => {
  try {
    const { productId, rating, title, content, photos } = req.body;
    const userId = req.user?.uid || req.body.user_id;

    if (!productId || !rating || !content) {
      return res.status(400).json({ error: 'productId, rating, and content are required' });
    }

    console.log(`\n📝 ═══ NEW TEXT REVIEW SUBMISSION ═══`);
    console.log(`   User: ${userId} | Product: ${productId} | Rating: ${rating}⭐`);

    // Run AI fraud analysis
    const analysis = await analyzeReview(content, parseInt(rating), userId, productId);

    // Create review record
    const reviewId = uuidv4();
    const review = {
      reviewId,
      userId,
      productId,
      rating: parseInt(rating),
      title: title || '',
      content,
      type: 'text',
      photos: photos || [],
      authenticityScore: analysis.authenticityScore,
      flagged: analysis.flagged,
      flagReasons: analysis.flagReasons,
      analysis: analysis.checks,
      status: analysis.flagged ? 'flagged' : 'approved',
      createdAt: new Date().toISOString()
    };

    // Save to DynamoDB
    await dynamoDB.put({
      TableName: 'Reviews',
      Item: review
    }).promise();

    console.log(`   💾 Review saved: ${reviewId}`);
    console.log(`   🎯 Authenticity Score: ${analysis.authenticityScore}/100`);
    console.log(`   ${analysis.flagged ? '🚩 FLAGGED' : '✅ APPROVED'}`);

    // Process trust engine event
    const trustUpdate = processEvent('REVIEW_SUBMITTED', {
      reviewId,
      userId,
      productId,
      rating: parseInt(rating),
      authenticityScore: analysis.authenticityScore,
      flagged: analysis.flagged
    });

    // Emit real-time events via Socket.io
    const io = req.app.get('io');
    if (io) {
      io.emit('REVIEW_SUBMITTED', {
        reviewId,
        productId,
        authenticityScore: analysis.authenticityScore,
        flagged: analysis.flagged,
        timestamp: new Date().toISOString()
      });

      if (analysis.flagged) {
        io.emit('REVIEW_FLAGGED', {
          reviewId,
          productId,
          userId,
          reasons: analysis.flagReasons,
          timestamp: new Date().toISOString()
        });
      }

      if (trustUpdate) {
        io.emit('SCORE_UPDATED', trustUpdate);
      }
    }

    res.status(201).json({
      success: true,
      review: {
        reviewId,
        authenticityScore: analysis.authenticityScore,
        flagged: analysis.flagged,
        flagReasons: analysis.flagReasons,
        status: review.status
      },
      analysis: analysis.checks
    });

  } catch (error) {
    console.error('❌ Review submission error:', error);
    res.status(500).json({ error: 'Failed to submit review', message: error.message });
  }
});

/**
 * POST /api/reviews/audio
 * Submit an audio review with transcription + fraud analysis
 */
router.post('/audio', verifyToken, upload.single('audio'), async (req, res) => {
  try {
    const { productId, rating, transcript } = req.body;
    const userId = req.user?.uid || req.body.user_id;
    const audioFile = req.file;

    if (!productId || !rating) {
      return res.status(400).json({ error: 'productId and rating are required' });
    }

    console.log(`\n🎤 ═══ NEW AUDIO REVIEW SUBMISSION ═══`);
    console.log(`   User: ${userId} | Product: ${productId} | Rating: ${rating}⭐`);

    let audioUrl = null;

    // Upload audio to S3 if provided
    if (audioFile) {
      const audioKey = `audio-reviews/${userId}/${uuidv4()}_${audioFile.originalname || 'review.webm'}`;
      await s3.upload({
        Bucket: process.env.S3_BUCKET || 'aegis-seller-uploads',
        Key: audioKey,
        Body: audioFile.buffer,
        ContentType: audioFile.mimetype || 'audio/webm'
      }).promise();
      audioUrl = audioKey;
      console.log(`   📤 Audio uploaded to S3: ${audioKey}`);
    }

    // Use the transcript from Web Speech API (sent from frontend)
    const reviewText = transcript || 'Audio review - transcript pending';

    // Run AI fraud analysis on transcript
    const analysis = await analyzeReview(reviewText, parseInt(rating), userId, productId);

    const reviewId = uuidv4();
    const review = {
      reviewId,
      userId,
      productId,
      rating: parseInt(rating),
      content: reviewText,
      type: 'audio',
      audioUrl,
      transcript: reviewText,
      authenticityScore: analysis.authenticityScore,
      flagged: analysis.flagged,
      flagReasons: analysis.flagReasons,
      analysis: analysis.checks,
      status: analysis.flagged ? 'flagged' : 'approved',
      createdAt: new Date().toISOString()
    };

    await dynamoDB.put({
      TableName: 'Reviews',
      Item: review
    }).promise();

    console.log(`   🎯 Authenticity Score: ${analysis.authenticityScore}/100`);

    // Emit events
    const io = req.app.get('io');
    if (io) {
      io.emit('REVIEW_SUBMITTED', {
        reviewId,
        productId,
        type: 'audio',
        authenticityScore: analysis.authenticityScore,
        flagged: analysis.flagged,
        timestamp: new Date().toISOString()
      });
    }

    res.status(201).json({
      success: true,
      review: {
        reviewId,
        transcript: reviewText,
        authenticityScore: analysis.authenticityScore,
        flagged: analysis.flagged,
        status: review.status
      },
      analysis: analysis.checks
    });

  } catch (error) {
    console.error('❌ Audio review error:', error);
    res.status(500).json({ error: 'Failed to submit audio review', message: error.message });
  }
});

/**
 * GET /api/reviews/product/:productId
 * Get all reviews for a product with analysis data
 */
router.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    const result = await dynamoDB.query({
      TableName: 'Reviews',
      IndexName: 'ProductIndex',
      KeyConditionExpression: 'productId = :pid',
      ExpressionAttributeValues: { ':pid': productId },
      ScanIndexForward: false
    }).promise();

    res.json({
      success: true,
      reviews: result.Items || [],
      count: result.Count || 0
    });

  } catch (error) {
    console.error('❌ Get reviews error:', error);
    // Fallback: try a scan if index doesn't exist yet
    try {
      const result = await dynamoDB.scan({
        TableName: 'Reviews',
        FilterExpression: 'productId = :pid',
        ExpressionAttributeValues: { ':pid': req.params.productId }
      }).promise();
      res.json({ success: true, reviews: result.Items || [], count: result.Count || 0 });
    } catch (scanError) {
      res.json({ success: true, reviews: [], count: 0 });
    }
  }
});

/**
 * GET /api/reviews/flagged
 * Get all flagged reviews (for Admin portal)
 */
router.get('/flagged', verifyToken, async (req, res) => {
  try {
    const result = await dynamoDB.scan({
      TableName: 'Reviews',
      FilterExpression: 'flagged = :flagged',
      ExpressionAttributeValues: { ':flagged': true }
    }).promise();

    res.json({
      success: true,
      reviews: result.Items || [],
      count: result.Count || 0
    });

  } catch (error) {
    console.error('❌ Flagged reviews error:', error);
    res.json({ success: true, reviews: [], count: 0 });
  }
});

module.exports = router;
