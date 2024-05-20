const {Schema,model,mongoose} = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategory: {
        type: mongoose.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    quantity: {
        type: String,
        required: true
    }
    ,
    photo: {
        data: Buffer,
        contentType: String
    },
    // shipping: {
    //     type: Boolean
    // }
}, { timeStamps: true })


const Product = new model("Product",productSchema);
module.exports = Product;