// src/models/sellerModel.js
const { dynamoDB } = require('../config/aws');

class SellerModel {
  static async getSellerById(sellerId) {
    const params = {
      TableName: 'Sellers',
      Key: { sellerId }
    };
    
    const result = await dynamoDB.get(params).promise();
    return result.Item;
  }

  static async createSeller(sellerData) {
    const params = {
      TableName: 'Sellers',
      Item: {
        sellerId: sellerData.sellerId,
        businessName: sellerData.businessName,
        email: sellerData.email,
        marketplaces: sellerData.marketplaces || 1,
        orders: sellerData.orders || 0,
        todaysSales: sellerData.todaysSales || 0,
        buyerMessages: sellerData.buyerMessages || 0,
        buyBoxWins: sellerData.buyBoxWins || 0,
        accountHealth: sellerData.accountHealth || 'Good',
        customerFeedback: sellerData.customerFeedback || 0,
        totalBalance: sellerData.totalBalance || 0,
        badge: sellerData.badge || 'New Seller',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };
    
    await dynamoDB.put(params).promise();
    return params.Item;
  }

  static async updateSeller(sellerId, updates) {
    const updateExpression = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};
    
    Object.keys(updates).forEach(key => {
      updateExpression.push(`#${key} = :${key}`);
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:${key}`] = updates[key];
    });
    
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();
    updateExpression.push('#updatedAt = :updatedAt');
    expressionAttributeNames['#updatedAt'] = 'updatedAt';

    const params = {
      TableName: 'Sellers',
      Key: { sellerId },
      UpdateExpression: `SET ${updateExpression.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    };
    
    const result = await dynamoDB.update(params).promise();
    return result.Attributes;
  }

  static async getSellerAnalytics(sellerId) {
    const params = {
      TableName: 'SellerAnalytics',
      KeyConditionExpression: 'sellerId = :sellerId',
      ExpressionAttributeValues: {
        ':sellerId': sellerId
      },
      ScanIndexForward: true
    };
    
    const result = await dynamoDB.query(params).promise();
    return result.Items;
  }

  static async addSellerAnalytics(analyticsData) {
    const params = {
      TableName: 'SellerAnalytics',
      Item: {
        sellerId: analyticsData.sellerId,
        month: analyticsData.month,
        stockUnavailable: analyticsData.stockUnavailable || 0,
        fraudDetected: analyticsData.fraudDetected || 0,
        goodReviews: analyticsData.goodReviews || 0,
        createdAt: new Date().toISOString()
      }
    };
    
    await dynamoDB.put(params).promise();
    return params.Item;
  }
}

module.exports = SellerModel;
