// scripts/setupTables.js
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB({
  region: 'ap-south-1'
});

const createTables = async () => {
  // Customer Table
  const customerTableParams = {
  TableName: 'Customers',
  KeySchema: [
    { AttributeName: 'customerId', KeyType: 'HASH' }
  ],
  AttributeDefinitions: [
    { AttributeName: 'customerId', AttributeType: 'S' },
    { AttributeName: 'trustScore', AttributeType: 'N' }
  ],
  BillingMode: 'PAY_PER_REQUEST',
  GlobalSecondaryIndexes: [
    {
      IndexName: 'TrustScoreIndex',
      KeySchema: [
        { AttributeName: 'trustScore', KeyType: 'HASH' }
      ],
      Projection: { ProjectionType: 'ALL' }
    }
  ]
};


  // Seller Table
  const sellerTableParams = {
    TableName: 'Sellers',
    KeySchema: [
      { AttributeName: 'sellerId', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'sellerId', AttributeType: 'S' }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  };

  // Customer Analytics Table
  const customerAnalyticsParams = {
    TableName: 'CustomerAnalytics',
    KeySchema: [
      { AttributeName: 'customerId', KeyType: 'HASH' },
      { AttributeName: 'month', KeyType: 'RANGE' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'customerId', AttributeType: 'S' },
      { AttributeName: 'month', AttributeType: 'S' }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  };

  // Seller Analytics Table
  const sellerAnalyticsParams = {
    TableName: 'SellerAnalytics',
    KeySchema: [
      { AttributeName: 'sellerId', KeyType: 'HASH' },
      { AttributeName: 'month', KeyType: 'RANGE' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'sellerId', AttributeType: 'S' },
      { AttributeName: 'month', AttributeType: 'S' }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  };

  try {
    await dynamodb.createTable(customerTableParams).promise();
    console.log('Customer table created');
    
    await dynamodb.createTable(sellerTableParams).promise();
    console.log('Seller table created');
    
    await dynamodb.createTable(customerAnalyticsParams).promise();
    console.log('Customer Analytics table created');
    
    await dynamodb.createTable(sellerAnalyticsParams).promise();
    console.log('Seller Analytics table created');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

createTables();
