const categoryModel = require('../models/category-model');
const slugify = require('slugify');
//create category
const categoryForm = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).json({ message: "category name is required" })
        }

        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(400).send({success: true , message: "Category already exist" })
        }

        const category = await new categoryModel({ name,slug:slugify(name) }).save();
        return res.status(200).send({ success: true, message: "new category created", category })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error in category" })
    }
};

//update category
const updateCategoryForm = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(400).send({success: true , message: "Category already exist" })
        }
        
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug:slugify(name) }, { new: true });
        res.status(200).send({ success: true, message: "Category Updated Successfully", category });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error in update category" })
    }

};

//get all category
const getAllCategory = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({ success: true, message: "All Category List", category });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error while getting all category" })
    }
}

//single category
const getSingleCategory = async (req, res) => {
    try {
        const slug = req.params.slug;
        const category = await categoryModel.findOne({ slug: slug });
        res.status(200).send({ success: true, message: "single Category", category });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error while getting single category" })
    }

}

//delete category
const deleteCategory = async (req, res) => {
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({ success: true, message: "Delete Category Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error while deleting category" })
    }
}

module.exports = { categoryForm, updateCategoryForm, getAllCategory, getSingleCategory, deleteCategory };