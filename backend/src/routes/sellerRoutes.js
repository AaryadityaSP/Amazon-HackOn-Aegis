// src/routes/sellerRoutes.js
const express = require('express');
const SellerController = require('../controller/sellerController');
const router = express.Router();

router.get('/:sellerId/dashboard', SellerController.getDashboard);
router.get('/:sellerId/track-record', SellerController.getTrackRecord);
router.post('/', SellerController.createSeller);
router.put('/:sellerId', SellerController.updateSeller);
router.post('/analytics', SellerController.addAnalytics);

module.exports = router;
