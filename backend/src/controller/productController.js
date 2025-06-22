const AWS = require('aws-sdk');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// AWS Configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'ap-south-1'
});

const s3 = new AWS.S3();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getSignedUrl = (bucket, key) => {
  const params = {
    Bucket: bucket,
    Key: key,
    Expires: 60 * 60 
  };
  return s3.getSignedUrl('getObject', params);
};

exports.addProduct = async (req, res) => {
  console.log("🚀 Starting product addition process");
  
  try {
    const { name, price, description, category, stock } = req.body;
    const image = req.file;

    // 1. Validate input
    if (!image || !name || !price || !description || !category || !stock) {
      console.error("❌ Validation failed: Missing fields");
      return res.status(400).json({ error: 'All fields are required' });
    }

    // 2. Upload image to S3
    console.log("📤 Uploading image to S3...");
    const s3Params = {
      Bucket: 'aegis-seller-uploads',
      Key: `${uuidv4()}_${image.originalname}`,
      Body: image.buffer,
      ContentType: image.mimetype
    };

    const s3UploadResult = await s3.upload(s3Params).promise();
    console.log("✅ S3 upload successful:", s3UploadResult.Location);
    
    // 3. Generate pre-signed URL for Roboflow
    console.log("🔗 Generating pre-signed URL...");
    const signedImageUrl = getSignedUrl('aegis-seller-uploads', s3UploadResult.Key);
    console.log("🔗 Signed URL:", signedImageUrl);

    // 4. Get reality score from Roboflow
    console.log("🤖 Calling Roboflow API...");
    const roboflowResponse = await axios.post(
      'https://serverless.roboflow.com/counterfeit-nike-shoes-detection/2',
      {},
      {
        params: {
          api_key: 'T8lhhZIv63NeMpEM2NYi',
          image: signedImageUrl
        },
        timeout: 30000 // 30 seconds timeout
      }
    );

    let realityScore = 0;
    if (roboflowResponse.data.predictions?.length > 0) {
      realityScore = Math.round(
        Math.max(...roboflowResponse.data.predictions.map(p => p.confidence)) * 100
      );
    }
    console.log("🎯 Reality Score:", realityScore);

    // 5. Prepare product data
    const productData = {
      productId: uuidv4(),
      sellerId: "TEMP_SELLER_123", // Hardcoded for now
      name: name,
      price: parseFloat(price),
      description: description,
      category: category,
      stock: parseInt(stock, 10),
      realityScore: realityScore,
      imageUrl: s3UploadResult.Location,
      signedImageUrl: signedImageUrl,
      createdAt: new Date().toISOString()
    };
    console.log("📝 Product Data:", productData);

    // 6. Save to DynamoDB
    console.log("💾 Saving to DynamoDB...");
    const dynamoParams = {
      TableName: 'SellerListings',
      Item: productData
    };

    await dynamoDb.put(dynamoParams).promise();
    console.log("💾 DynamoDB save successful");

    res.status(201).json({
      success: true,
      product: productData
    });

  } catch (error) {
    console.error('❌ Error in addProduct:', error);
    
    // Detailed error response
    const errorResponse = {
      error: 'Internal server error',
      message: error.message
    };

    if (error.response) {
      console.error('🔴 Roboflow Response Error:', error.response.data);
      errorResponse.roboflowError = error.response.data;
    }
    
    if (error.code === 'NetworkingError') {
      console.error('🌐 Network Error:', error.message);
      errorResponse.networkError = true;
    }

    res.status(500).json(errorResponse);
  }
};
