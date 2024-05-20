const express = require('express');
const router = express.Router();
const subCategoryController = require('../controller/sub-category-controller');
const formidable = require('express-formidable');

//create category
router.route('/create-subcategory').post(subCategoryController.subcategoryForm);

//update category
router.route('/update-subcategory/:id').put(subCategoryController.updateSubCategoryForm);

//get all category
router.route('/getall-subcategory').get(subCategoryController.getAllSubCategory);

//single category
router.route('/single-subcategory/:slug').get(subCategoryController.getSingleSubCategory);

//delete category
router.route('/delete-subcategory/:id').delete(subCategoryController.deleteSubCategory);


module.exports = router;