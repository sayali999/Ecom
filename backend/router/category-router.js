const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category-controller');

//create category
router.route('/create-category').post(categoryController.categoryForm);

//update category
router.route('/update-category/:id').put(categoryController.updateCategoryForm);

//get all category
router.route('/getall-category').get(categoryController.getAllCategory);

//single category
router.route('/single-category/:slug').get(categoryController.getSingleCategory);

//delete category
router.route('/delete-category/:id').delete(categoryController.deleteCategory);


module.exports = router;