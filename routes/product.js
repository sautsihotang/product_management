const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

// Add product
router.post('/', productController.addProduct);

// Get products
router.get('/', productController.getProducts);

// Get product by id
router.get('/:id', productController.getProductById);

// Remove product by id
router.delete('/:id', productController.removeProductById);

// Update product by id
router.put('/:id', productController.updateProductById);

module.exports = router;
