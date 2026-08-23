// scripts/setupTables.js
// Creates all DynamoDB tables for Aegis platform

require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.AWS_REGION || 'ap-south-1' });
const dynamodb = new AWS.DynamoDB();

const tables = [
  // ─── Existing Tables ───
  {
    TableName: 'Customers',
    KeySchema: [{ AttributeName: 'customerId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'customerId', AttributeType: 'S' },
      { AttributeName: 'trustScore', AttributeType: 'N' }
    ],
    GlobalSecondaryIndexes: [{
      IndexName: 'TrustScoreIndex',
      KeySchema: [{ AttributeName: 'trustScore', KeyType: 'HASH' }],
      Projection: { ProjectionType: 'ALL' }
    }],
    BillingMode: 'PAY_PER_REQUEST'
  },
  {
    TableName: 'Sellers',
    KeySchema: [{ AttributeName: 'sellerId', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'sellerId', AttributeType: 'S' }],
    BillingMode: 'PAY_PER_REQUEST'
  },
  {
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
  },
  {
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
  },

  // ─── NEW Aegis Tables ───
  {
    TableName: 'SellerListings',
    KeySchema: [{ AttributeName: 'productId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'productId', AttributeType: 'S' },
      { AttributeName: 'sellerId', AttributeType: 'S' }
    ],
    GlobalSecondaryIndexes: [{
      IndexName: 'SellerIndex',
      KeySchema: [{ AttributeName: 'sellerId', KeyType: 'HASH' }],
      Projection: { ProjectionType: 'ALL' }
    }],
    BillingMode: 'PAY_PER_REQUEST'
  },
  {
    TableName: 'Reviews',
    KeySchema: [{ AttributeName: 'reviewId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'reviewId', AttributeType: 'S' },
      { AttributeName: 'productId', AttributeType: 'S' },
      { AttributeName: 'userId', AttributeType: 'S' }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'ProductIndex',
        KeySchema: [{ AttributeName: 'productId', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'ALL' }
      },
      {
        IndexName: 'UserIndex',
        KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'ALL' }
      }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  },
  {
    TableName: 'Flags',
    KeySchema: [{ AttributeName: 'flagId', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'flagId', AttributeType: 'S' }],
    BillingMode: 'PAY_PER_REQUEST'
  },
  {
    TableName: 'Collaborations',
    KeySchema: [{ AttributeName: 'collabId', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'collabId', AttributeType: 'S' }],
    BillingMode: 'PAY_PER_REQUEST'
  }
];

async function createTables() {
  console.log('🏗️  Setting up Aegis DynamoDB tables...\n');

  for (const tableParams of tables) {
    try {
      await dynamodb.createTable(tableParams).promise();
      console.log(`   ✅ Created: ${tableParams.TableName}`);
    } catch (error) {
      if (error.code === 'ResourceInUseException') {
        console.log(`   ⏭️  Already exists: ${tableParams.TableName}`);
      } else {
        console.error(`   ❌ Failed: ${tableParams.TableName} - ${error.message}`);
      }
    }
  }

  console.log('\n✅ Table setup complete!\n');
  console.log('Tables created:');
  console.log('  ├── Customers (with TrustScoreIndex)');
  console.log('  ├── Sellers');
  console.log('  ├── CustomerAnalytics');
  console.log('  ├── SellerAnalytics');
  console.log('  ├── SellerListings (with SellerIndex) [NEW]');
  console.log('  ├── Reviews (with ProductIndex, UserIndex) [NEW]');
  console.log('  ├── Flags [NEW]');
  console.log('  └── Collaborations [NEW]');
}

createTables();
