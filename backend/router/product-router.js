const express = require('express');
const router = express.Router();
const productController = require('../controller/product-controller');
const formidable = require('express-formidable');
const authMiddleware = require('../middlewares/authMiddleware');

//create product
router.route('/create-product').post(formidable(),productController.productForm);

//get all products
router.route('/getall-product').get(productController.getAllProduct);

//single product
router.route('/single-product/:slug').get(productController.getSingleProduct);

//getphoto
router.route('/product-photo/:pid').get(productController.getProductPhoto);

//delete product
router.route('/delete-product/:pid').delete(productController.deleteProduct);

//product by sub category
router.route('/product-by-subcategory/:slug').get(productController.getProductBySybcategory);

//update product
router.route('/update-product/:pid').put(formidable(),productController.updateProduct);



module.exports = router;
