const subCategoryModel = require('../models/sub-category-model');
const slugify = require('slugify');
//create category
const subcategoryForm = async (req, res) => {
    try {

        const { name, category } = req.body;

        const existingSubCategory = await subCategoryModel.findOne({ name });
        if (existingSubCategory) {
            return res.status(400).send({ success: true, message: "sub-Category already exist" })
        }

        const subcategory = await new subCategoryModel({ name, category, slug: slugify(name) }).save();
        // await subcategory.save();
        return res.status(200).send({ success: true, message: "Sub-category created successfully", subcategory });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error in sub category" })
    }
};

//update category
const updateSubCategoryForm = async (req, res) => {
    try {
        const { name } = req.body;
        const { category } = req.body;
        const { id } = req.params;

        const existingSubCategory = await subCategoryModel.findOne({ name });
        if (existingSubCategory) {
            return res.status(400).send({ success: true, message: "sub-Category already exist" })
        }

        const subcategory = await subCategoryModel.findByIdAndUpdate(id, { name, category, slug: slugify(name) }, { new: true });
        res.status(200).send({ success: true, message: "Sub-Category Updated Successfully", subcategory });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error in update category" })
    }

};

//get all category
const getAllSubCategory = async (req, res) => {
    try {
        const subCategory = await subCategoryModel.find({}).populate('category');
        res.status(200).send({ success: true, message: "All Category List", subCategory });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error while getting all category" })
    }
}

//single sub category
const getSingleSubCategory = async (req, res) => {
    try {
        // const category = await subCategoryModel.find({}).populate('category');
        const subCategory = await subCategoryModel.findOne({ slug: req.params.slug }).populate('category');
       
        res.status(200).send({ success: true, message: "single Category", subCategory });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error while getting single sub category" })
    }

}

//delete sub category
const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await subCategoryModel.findByIdAndDelete(id);
        res.status(200).send({ success: true, message: "Deleted Sub-Category Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error while deleting Sub category" })
    }
}



module.exports = { subcategoryForm, updateSubCategoryForm, getAllSubCategory, getSingleSubCategory, deleteSubCategory };