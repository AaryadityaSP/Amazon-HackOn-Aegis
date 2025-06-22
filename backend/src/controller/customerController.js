// src/controllers/customerController.js
const CustomerModel = require('../models/customerModel');

class CustomerController {
  static async getDashboard(req, res) {
    try {
      const { customerId } = req.params;
      
      // Get customer data
      const customer = await CustomerModel.getCustomerById(customerId);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      // Get analytics data
      const analytics = await CustomerModel.getCustomerAnalytics(customerId);
      
      // Calculate trust badge and policies
      const trustScore = customer.trustScore;
      const trustBadge = trustScore >= 85 ? 'Trusted Customer' : 
                         trustScore >= 60 ? 'Regular Customer' : 'Needs Improvement';
      
      const policy = trustScore >= 85 ? '7 Days Return & Refund' :
                     trustScore >= 60 ? '4 Days Return & Refund' : 'No Return Policy';
      
      const cashback = trustScore >= 85 ? 'Eligible for Special Cashback' :
                       trustScore >= 60 ? 'Eligible for Basic Cashback' : 'No Cashback Benefits';

      // Format KPIs
      const kpis = [
        { label: "ORDERS", value: customer.orders },
        { label: "RETURNS", value: customer.returns },
        { label: "REFUNDS", value: customer.refunds },
        { label: "CASHBACK & OFFERS", value: customer.cashbackEligible ? "Eligible" : "Not Eligible" },
        { label: "TRUST SCORE", value: customer.trustScore },
        { label: "POLICY", value: customer.returnPolicy }
      ];

      // Format graph data
      const graphData = analytics.map(item => ({
        month: item.month,
        FakeReviews: item.fakeReviews,
        TrustedReviews: item.trustedReviews,
        HonestReturns: item.honestReturns,
        FraudReturns: item.fraudReturns
      }));

      res.json({
        kpis,
        trustScore: customer.trustScore,
        trustBadge,
        policy,
        cashback,
        graphData,
        customer
      });
    } catch (error) {
      console.error('Customer dashboard error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createCustomer(req, res) {
    try {
      const customerData = req.body;
      const customer = await CustomerModel.createCustomer(customerData);
      res.status(201).json(customer);
    } catch (error) {
      console.error('Create customer error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateCustomer(req, res) {
    try {
      const { customerId } = req.params;
      const updates = req.body;
      
      const updatedCustomer = await CustomerModel.updateCustomer(customerId, updates);
      res.json(updatedCustomer);
    } catch (error) {
      console.error('Update customer error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async addAnalytics(req, res) {
    try {
      const analyticsData = req.body;
      const analytics = await CustomerModel.addCustomerAnalytics(analyticsData);
      res.status(201).json(analytics);
    } catch (error) {
      console.error('Add analytics error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = CustomerController;
