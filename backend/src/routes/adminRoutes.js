// src/routes/adminRoutes.js
// Aegis Admin/Ops Portal - Fraud & CS Ops endpoints

const express = require('express');
const router = express.Router();
const { dynamoDB } = require('../config/aws');
const { verifyToken } = require('../middleware/auth');
const { calculateSellerTrustScore, getSellerBadge, calculateCustomerMeritScore, getCustomerTier } = require('../services/trustEngine');

/**
 * GET /api/admin/dashboard
 * Admin overview: flagged items, scores, system status
 */
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    console.log('🛡️ Admin dashboard requested');

    // Get flagged reviews
    let flaggedReviews = [];
    try {
      const reviewResult = await dynamoDB.scan({
        TableName: 'Reviews',
        FilterExpression: 'flagged = :f',
        ExpressionAttributeValues: { ':f': true }
      }).promise();
      flaggedReviews = reviewResult.Items || [];
    } catch (e) { /* table might not exist yet */ }

    // Get flagged listings
    let flaggedListings = [];
    try {
      const listingResult = await dynamoDB.scan({
        TableName: 'SellerListings',
        FilterExpression: 'flagged = :f',
        ExpressionAttributeValues: { ':f': true }
      }).promise();
      flaggedListings = listingResult.Items || [];
    } catch (e) { /* table might not exist yet */ }

    // Get all flags
    let flags = [];
    try {
      const flagResult = await dynamoDB.scan({
        TableName: 'Flags'
      }).promise();
      flags = flagResult.Items || [];
    } catch (e) { /* table might not exist yet */ }

    // Get recent events (from Flags table, sorted by timestamp)
    const recentFlags = flags
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 20);

    const dashboard = {
      summary: {
        totalFlaggedReviews: flaggedReviews.length,
        totalFlaggedListings: flaggedListings.length,
        totalActiveFlags: flags.filter(f => f.status === 'pending').length,
        resolvedFlags: flags.filter(f => f.status === 'resolved').length
      },
      flaggedReviews: flaggedReviews.slice(0, 10),
      flaggedListings: flaggedListings.slice(0, 10),
      recentActivity: recentFlags,
      systemStatus: {
        imageAnalyzer: 'active',
        reviewAnalyzer: 'active',
        trustEngine: 'active',
        socketIO: 'active'
      }
    };

    res.json({ success: true, dashboard });

  } catch (error) {
    console.error('❌ Admin dashboard error:', error);
    res.json({
      success: true,
      dashboard: {
        summary: { totalFlaggedReviews: 0, totalFlaggedListings: 0, totalActiveFlags: 0, resolvedFlags: 0 },
        flaggedReviews: [],
        flaggedListings: [],
        recentActivity: [],
        systemStatus: { imageAnalyzer: 'active', reviewAnalyzer: 'active', trustEngine: 'active', socketIO: 'active' }
      }
    });
  }
});

/**
 * POST /api/admin/resolve-flag
 * Resolve a flagged item (review or listing)
 */
router.post('/resolve-flag', verifyToken, async (req, res) => {
  try {
    const { flagId, resolution, adminNotes } = req.body;

    await dynamoDB.update({
      TableName: 'Flags',
      Key: { flagId },
      UpdateExpression: 'SET #status = :status, resolution = :resolution, adminNotes = :notes, resolvedAt = :time',
      ExpressionAttributeNames: { '#status': 'status' },
      ExpressionAttributeValues: {
        ':status': 'resolved',
        ':resolution': resolution, // 'approved', 'removed', 'warning'
        ':notes': adminNotes || '',
        ':time': new Date().toISOString()
      }
    }).promise();

    // Emit real-time event
    const io = req.app.get('io');
    if (io) {
      io.emit('FLAG_RESOLVED', { flagId, resolution, timestamp: new Date().toISOString() });
    }

    console.log(`✅ Flag ${flagId} resolved: ${resolution}`);
    res.json({ success: true, message: 'Flag resolved' });

  } catch (error) {
    console.error('❌ Resolve flag error:', error);
    res.status(500).json({ error: 'Failed to resolve flag' });
  }
});

/**
 * GET /api/admin/sellers
 * Get all sellers with trust scores and badges
 */
router.get('/sellers', verifyToken, async (req, res) => {
  try {
    const result = await dynamoDB.scan({ TableName: 'Sellers' }).promise();
    const sellers = (result.Items || []).map(seller => {
      const score = calculateSellerTrustScore(seller);
      const badge = getSellerBadge(score);
      return { ...seller, trustScore: score, badge };
    });

    res.json({ success: true, sellers });
  } catch (error) {
    console.error('❌ Get sellers error:', error);
    res.json({ success: true, sellers: [] });
  }
});

/**
 * GET /api/admin/customers
 * Get all customers with merit scores
 */
router.get('/customers', verifyToken, async (req, res) => {
  try {
    const result = await dynamoDB.scan({ TableName: 'Customers' }).promise();
    const customers = (result.Items || []).map(customer => {
      const score = calculateCustomerMeritScore(customer);
      const tier = getCustomerTier(score);
      return { ...customer, meritScore: score, tier };
    });

    res.json({ success: true, customers });
  } catch (error) {
    console.error('❌ Get customers error:', error);
    res.json({ success: true, customers: [] });
  }
});

/**
 * GET /api/admin/analytics
 * System-wide fraud analytics
 */
router.get('/analytics', verifyToken, async (req, res) => {
  try {
    // Count reviews by status
    let allReviews = [];
    try {
      const reviewResult = await dynamoDB.scan({ TableName: 'Reviews' }).promise();
      allReviews = reviewResult.Items || [];
    } catch (e) { /* */ }

    const totalReviews = allReviews.length;
    const flaggedCount = allReviews.filter(r => r.flagged).length;
    const approvedCount = totalReviews - flaggedCount;
    const avgScore = totalReviews > 0
      ? Math.round(allReviews.reduce((sum, r) => sum + (r.authenticityScore || 0), 0) / totalReviews)
      : 0;

    // Score distribution
    const distribution = {
      excellent: allReviews.filter(r => (r.authenticityScore || 0) >= 80).length,
      good: allReviews.filter(r => (r.authenticityScore || 0) >= 60 && (r.authenticityScore || 0) < 80).length,
      suspicious: allReviews.filter(r => (r.authenticityScore || 0) >= 40 && (r.authenticityScore || 0) < 60).length,
      flagged: allReviews.filter(r => (r.authenticityScore || 0) < 40).length
    };

    res.json({
      success: true,
      analytics: {
        reviews: { total: totalReviews, flagged: flaggedCount, approved: approvedCount, avgScore },
        distribution,
        fraudDetectionRate: totalReviews > 0 ? Math.round((flaggedCount / totalReviews) * 100) : 0
      }
    });

  } catch (error) {
    console.error('❌ Analytics error:', error);
    res.json({
      success: true,
      analytics: {
        reviews: { total: 0, flagged: 0, approved: 0, avgScore: 0 },
        distribution: { excellent: 0, good: 0, suspicious: 0, flagged: 0 },
        fraudDetectionRate: 0
      }
    });
  }
});

module.exports = router;
