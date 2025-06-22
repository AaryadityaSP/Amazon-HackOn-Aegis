const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const upload = require('../middleware/uploadMiddleware');
router.get('/test', (req, res) => {
  res.json({ message: 'Routes working!' });
});

router.post('/products', 
  upload.single('image'), 
  productController.addProduct
);

module.exports = router;
