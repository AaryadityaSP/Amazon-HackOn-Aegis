// src/routes/customerRoutes.js
const express = require('express');
const CustomerController = require('../controller/customerController');
const router = express.Router();

router.get('/:customerId/dashboard', CustomerController.getDashboard);
router.post('/', CustomerController.createCustomer);
router.put('/:customerId', CustomerController.updateCustomer);
router.post('/analytics', CustomerController.addAnalytics);

module.exports = router;

