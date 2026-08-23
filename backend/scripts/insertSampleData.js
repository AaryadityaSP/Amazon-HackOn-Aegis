// scripts/insertSampleData.js
require('dotenv').config();
const { dynamoDB } = require('../src/config/aws');
const CustomerModel = require('../src/models/customerModel');
const SellerModel = require('../src/models/sellerModel');

const insertSampleData = async () => {
  try {
    console.log('🌱 Inserting Aegis sample data...');

    // 1. Sample Customer Data
    const sampleCustomer = {
      customerId: 'demo-customer-001',
      name: 'Aegis Tester',
      email: 'customer@aegis-demo.com',
      orders: 21,
      returns: 2,
      refunds: 2,
      trustScore: 89,
      cashbackEligible: true,
      returnPolicy: '7 Days Return',
      createdAt: new Date().toISOString()
    };

    await CustomerModel.createCustomer(sampleCustomer);
    console.log('✅ Sample customer created');

    // 2. Sample Seller Data
    const sampleSeller = {
      sellerId: 'demo-seller-001',
      businessName: 'Aegis Demo Store',
      email: 'seller@aegis-demo.com',
      marketplaces: 1,
      orders: 150,
      returns: 3,
      todaysSales: 2,
      buyerMessages: 0,
      buyBoxWins: 0,
      accountHealth: 'Good',
      customerFeedback: 4.8,
      totalBalance: 45000,
      trustScore: 92,
      badge: 'Gold Seller',
      createdAt: new Date().toISOString()
    };

    await SellerModel.createSeller(sampleSeller);
    console.log('✅ Sample seller created');

    // 3. Bad Actor Seller Data
    const badSeller = {
      sellerId: 'demo-bad-seller-001',
      businessName: 'Sketchy Tech',
      email: 'badseller@aegis-demo.com',
      marketplaces: 1,
      orders: 45,
      returns: 12, // High return rate
      trustScore: 35,
      badge: 'Flagged',
      accountHealth: 'At Risk',
      createdAt: new Date().toISOString()
    };

    await SellerModel.createSeller(badSeller);
    console.log('✅ Bad actor seller created');

    // 4. Sample Flagged Listing
    const flaggedListing = {
      productId: 'prod_flagged_1',
      sellerId: 'demo-bad-seller-001',
      name: 'Super Fake Headphones',
      price: 999,
      description: 'Amazing quality headphones.',
      category: 'Electronics',
      stock: 50,
      imageIntegrityScore: 22,
      flagged: true,
      flagReasons: [
        'Metadata completely stripped or missing EXIF',
        'Suspicious software found in metadata (Photoshop/GIMP/AI)',
        'Low image quality or unnatural entropy (possible stock/generated).'
      ],
      status: 'under_review',
      createdAt: new Date().toISOString()
    };
    await dynamoDB.put({ TableName: 'SellerListings', Item: flaggedListing }).promise();
    console.log('✅ Sample flagged listing created');

    // 5. Sample Flagged Review
    const flaggedReview = {
      reviewId: 'rev_flagged_1',
      productId: 'oneplus13',
      userId: 'demo-bot-user',
      rating: 5,
      content: 'Amazing wonderful superb fantastic best purchase ever fast delivery excellent love it perfect buy now.',
      type: 'text',
      authenticityScore: 15,
      flagged: true,
      flagReasons: [
        'Bot-like or manipulative patterns detected.',
        'Extremely generic review lacking product specifics.'
      ],
      status: 'flagged',
      createdAt: new Date().toISOString()
    };
    await dynamoDB.put({ TableName: 'Reviews', Item: flaggedReview }).promise();
    console.log('✅ Sample flagged review created');

    // 6. System Flags for Admin Dashboard
    const systemFlag1 = {
      flagId: 'flag_listing_1',
      type: 'listing',
      targetId: 'prod_flagged_1',
      sellerId: 'demo-bad-seller-001',
      severity: 'high',
      reasons: flaggedListing.flagReasons,
      score: 22,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    const systemFlag2 = {
      flagId: 'flag_review_1',
      type: 'review',
      targetId: 'rev_flagged_1',
      sellerId: 'demo-seller-001',
      severity: 'high',
      reasons: flaggedReview.flagReasons,
      score: 15,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    await dynamoDB.put({ TableName: 'Flags', Item: systemFlag1 }).promise();
    await dynamoDB.put({ TableName: 'Flags', Item: systemFlag2 }).promise();
    console.log('✅ Sample admin flags created');

    console.log('\n🎉 All Aegis sample data inserted successfully!');

  } catch (error) {
    console.error('❌ Error inserting sample data:', error);
  }
};

insertSampleData();
