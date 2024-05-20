const slugify = require('slugify');
const productModel = require('../models/product-model');
const subcategoryModel = require('../models/sub-category-model');

const fs = require('fs');


//create product
const productForm = async (req, res) => {
    try {
        const { name, slug, description, price, category, subcategory, quantity } = req.fields;

        const { photo } = req.files;

        //validation
        // switch (true) {
        //     case !name:
        //         return res.status(500).send({ error: 'Name is required' });
        //     case !description:
        //         return res.status(500).send({ error: 'Description is required' });
        //     case !price:
        //         return res.status(500).send({ error: 'Price is required' });
        //     case !category:
        //         return res.status(500).send({ error: 'Category is required' });
        //     case !subcategory:
        //         return res.status(500).send({ error: 'subcategory is required' });
        //     case !quantity:
        //         return res.status(500).send({ error: 'Quantity is required' });
        //     case photo && photo.size > 1000000:
        //         return res.status(500).send({ error: 'Photo is required should be less than 1mb' });
        // }


        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(200).send({
            success: true,
            message: "Product created successfully",
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in creating product"
        })
    }
}

//get all product
const getAllProduct = async (req, res) => {
    try {

        const products = await productModel.find({}).populate('category').populate('subcategory').select("-photo").sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            count: products.length,
            message: "All Product List",
            products
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error while getting all product"
        })

    }
}

//single product
const getSingleProduct = async (req, res) => {
    try {
        const products = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate('category').populate('subcategory');
        res.status(200).send({ success: true, message: "Get Single product", products });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error while getting single product"
        })
    }
}

//get product by its subcategory
const getProductBySybcategory = async (req, res) => {
    try {

        const subcategory = await subcategoryModel.findOne({ slug: req.params.slug });

        const products = await productModel.find({ subcategory }).populate('subcategory').populate('category').select("-photo");
        res.status(200).send({ success: true, message: "Get product by sub category", subcategory, products });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error while getting single product"
        })
    }
}

//get photo
const getProductPhoto = async (req, res) => {
    try {
        const products = await productModel.findById(req.params.pid).select("photo");
        if (products.photo.data) {
            res.set('Content-type', products.photo.contentType);
            return res.status(200).send(products.photo.data);
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error while getting product photo"
        })
    }
}

//delete product
const deleteProduct = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product deleted successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error while deleting product"
        })
    }
}

//update product
const updateProduct = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity } = req.fields;
        const { photo } = req.files;

        //validation
        // switch (true) {
        //     case !name:
        //         return res.status(500).send({ error: 'Name is required' });
        //     case !description:
        //         return res.status(500).send({ error: 'Description is required' });
        //     case !price:
        //         return res.status(500).send({ error: 'Price is required' });
        //     case !category:
        //         return res.status(500).send({ error: 'Category is required' });
        //     case !quantity:
        //         return res.status(500).send({ error: 'Quantity is required' });
        //     case photo && photo.size > 1000000:
        //         return res.status(500).send({ error: 'Photo is required should be less than 1mb' });
        // }


        const products = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) }, { new: true });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(200).send({
            success: true,
            message: "Product update successfully",
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in updating product"
        })
    }
}






module.exports = { productForm, getAllProduct, getSingleProduct, getProductPhoto, deleteProduct, updateProduct, getProductBySybcategory};