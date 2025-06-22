// src/models/customerModel.js
const { dynamoDB } = require('../config/aws');

class CustomerModel {
  static async getCustomerById(customerId) {
    const params = {
      TableName: 'Customers',
      Key: { customerId }
    };
    
    const result = await dynamoDB.get(params).promise();
    return result.Item;
  }

  static async createCustomer(customerData) {
    const params = {
      TableName: 'Customers',
      Item: {
        customerId: customerData.customerId,
        name: customerData.name,
        email: customerData.email,
        orders: customerData.orders || 0,
        returns: customerData.returns || 0,
        refunds: customerData.refunds || 0,
        trustScore: customerData.trustScore || 50,
        cashbackEligible: customerData.cashbackEligible || false,
        returnPolicy: customerData.returnPolicy || '3 Days Return',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };
    
    await dynamoDB.put(params).promise();
    return params.Item;
  }

  static async updateCustomer(customerId, updates) {
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
      TableName: 'Customers',
      Key: { customerId },
      UpdateExpression: `SET ${updateExpression.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    };
    
    const result = await dynamoDB.update(params).promise();
    return result.Attributes;
  }

  static async getCustomerAnalytics(customerId) {
    const params = {
      TableName: 'CustomerAnalytics',
      KeyConditionExpression: 'customerId = :customerId',
      ExpressionAttributeValues: {
        ':customerId': customerId
      },
      ScanIndexForward: true
    };
    
    const result = await dynamoDB.query(params).promise();
    return result.Items;
  }

  static async addCustomerAnalytics(analyticsData) {
    const params = {
      TableName: 'CustomerAnalytics',
      Item: {
        customerId: analyticsData.customerId,
        month: analyticsData.month,
        fakeReviews: analyticsData.fakeReviews || 0,
        trustedReviews: analyticsData.trustedReviews || 0,
        honestReturns: analyticsData.honestReturns || 0,
        fraudReturns: analyticsData.fraudReturns || 0,
        createdAt: new Date().toISOString()
      }
    };
    
    await dynamoDB.put(params).promise();
    return params.Item;
  }
}

module.exports = CustomerModel;
