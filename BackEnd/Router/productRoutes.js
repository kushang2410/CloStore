const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController');
const auth = require('../Middleware/authMiddleware');

module.exports = (upload) => {

  router.post('/', auth, upload.single('image'), productController.createProduct);
  router.put('/:id', auth, upload.single('image'), productController.updateProduct);
  
  router.get('/', productController.getProducts);
  router.get('/:id', productController.getProductById);
  router.delete('/:id', auth, productController.deleteProduct);
  
  return router;
};