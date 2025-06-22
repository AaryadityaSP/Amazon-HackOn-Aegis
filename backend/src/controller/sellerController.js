// src/controllers/sellerController.js
const SellerModel = require('../models/sellerModel');

class SellerController {
  static async getDashboard(req, res) {
    try {
      const { sellerId } = req.params;
      
      // Get seller data
      const seller = await SellerModel.getSellerById(sellerId);
      if (!seller) {
        return res.status(404).json({ error: 'Seller not found' });
      }

      // Format KPIs
      const kpis = [
        { label: "MARKETPLACES", value: seller.marketplaces },
        { label: "ORDERS", value: seller.orders },
        { label: "TODAY'S SALES", value: `₹${seller.todaysSales.toFixed(2)}` },
        { label: "BUYER MESSAGES", value: seller.buyerMessages },
        { label: "BUY BOX WINS", value: seller.buyBoxWins || "--" },
        { label: "ACCOUNT HEALTH", value: seller.accountHealth || "--" },
        { label: "CUSTOMER FEEDBACK", value: seller.customerFeedback },
        { label: "TOTAL BALANCE", value: `₹${seller.totalBalance.toFixed(2)}` }
      ];

      // Badge information
      const badge = {
        name: seller.badge || "New Seller",
        description: seller.badge === "Top Seller" ? 
          "Consistently high order fulfillment and positive feedback" : 
          "Building reputation on the platform",
        icon: "EmojiEventsIcon"
      };

      res.json({
        kpis,
        badge,
        seller
      });
    } catch (error) {
      console.error('Seller dashboard error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getTrackRecord(req, res) {
    try {
      const { sellerId } = req.params;
      
      // Get analytics data
      const analytics = await SellerModel.getSellerAnalytics(sellerId);
      
      // Format graph data
      const graphData = analytics.map(item => ({
        month: item.month,
        StockUnavailable: item.stockUnavailable,
        Fraud: item.fraudDetected,
        GoodReviews: item.goodReviews
      }));

      // Calculate stats
      const stats = {
        stockUnavailable: analytics.reduce((sum, item) => sum + item.stockUnavailable, 0),
        fraudDetected: analytics.reduce((sum, item) => sum + item.fraudDetected, 0),
        goodReviews: analytics.reduce((sum, item) => sum + item.goodReviews, 0)
      };

      res.json({
        graphData,
        stats
      });
    } catch (error) {
      console.error('Seller track record error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createSeller(req, res) {
    try {
      const sellerData = req.body;
      const seller = await SellerModel.createSeller(sellerData);
      res.status(201).json(seller);
    } catch (error) {
      console.error('Create seller error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateSeller(req, res) {
    try {
      const { sellerId } = req.params;
      const updates = req.body;
      
      const updatedSeller = await SellerModel.updateSeller(sellerId, updates);
      res.json(updatedSeller);
    } catch (error) {
      console.error('Update seller error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async addAnalytics(req, res) {
    try {
      const analyticsData = req.body;
      const analytics = await SellerModel.addSellerAnalytics(analyticsData);
      res.status(201).json(analytics);
    } catch (error) {
      console.error('Add analytics error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = SellerController;
