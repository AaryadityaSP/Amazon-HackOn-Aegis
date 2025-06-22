require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const productRoutes = require('./src/routes/productRoutes');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', productRoutes);
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!' });})
// AWS Configuration
AWS.config.update({
    region: 'ap-south-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
// =============================
// CUSTOMER DASHBOARD ENDPOINTS
// =============================
app.get('/api/customer/:userId/dashboard', async (req, res) => {
    // Implementation from previous code
});

app.get('/api/customer/:userId/analytics', async (req, res) => {
    // Implementation from previous code
});

// =========================
// SELLER DASHBOARD ENDPOINTS
// =========================
app.get('/api/seller/:sellerId/dashboard', async (req, res) => {
    // Implementation from previous code
});

app.get('/api/seller/:sellerId/track-record', async (req, res) => {
    // Implementation from previous code
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Backend running on port ${port}`);
});

