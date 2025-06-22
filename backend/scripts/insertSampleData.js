// scripts/insertSampleData.js
const CustomerModel = require('../src/models/customerModel');
const SellerModel = require('../src/models/sellerModel');

const insertSampleData = async () => {
  try {
    // Sample Customer Data
    const sampleCustomer = {
      customerId: 'user123',
      name: 'John Doe',
      email: 'john@example.com',
      orders: 21,
      returns: 2,
      refunds: 2,
      trustScore: 89,
      cashbackEligible: true,
      returnPolicy: '7 Days Return'
    };

    await CustomerModel.createCustomer(sampleCustomer);
    console.log('Sample customer created');

    // Sample Customer Analytics
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const analyticsData = [
      { fakeReviews: 1, trustedReviews: 3, honestReturns: 2, fraudReturns: 0 },
      { fakeReviews: 0, trustedReviews: 4, honestReturns: 1, fraudReturns: 1 },
      { fakeReviews: 2, trustedReviews: 2, honestReturns: 0, fraudReturns: 1 },
      { fakeReviews: 0, trustedReviews: 5, honestReturns: 1, fraudReturns: 0 },
      { fakeReviews: 1, trustedReviews: 4, honestReturns: 2, fraudReturns: 0 }
    ];

    for (let i = 0; i < months.length; i++) {
      await CustomerModel.addCustomerAnalytics({
        customerId: 'user123',
        month: months[i],
        ...analyticsData[i]
      });
    }
    console.log('Customer analytics data added');

    // Sample Seller Data
    const sampleSeller = {
      sellerId: 'seller123',
      businessName: 'ABC Electronics',
      email: 'seller@example.com',
      marketplaces: 1,
      orders: 0,
      todaysSales: 0,
      buyerMessages: 0,
      buyBoxWins: 0,
      accountHealth: 'Good',
      customerFeedback: 0,
      totalBalance: 0,
      badge: 'Top Seller'
    };

    await SellerModel.createSeller(sampleSeller);
    console.log('Sample seller created');

    // Sample Seller Analytics
    const sellerAnalyticsData = [
      { stockUnavailable: 2, fraudDetected: 1, goodReviews: 5 },
      { stockUnavailable: 1, fraudDetected: 0, goodReviews: 8 },
      { stockUnavailable: 3, fraudDetected: 2, goodReviews: 7 },
      { stockUnavailable: 0, fraudDetected: 0, goodReviews: 9 },
      { stockUnavailable: 1, fraudDetected: 1, goodReviews: 10 }
    ];

    for (let i = 0; i < months.length; i++) {
      await SellerModel.addSellerAnalytics({
        sellerId: 'seller123',
        month: months[i],
        ...sellerAnalyticsData[i]
      });
    }
    console.log('Seller analytics data added');

  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
};

insertSampleData();
