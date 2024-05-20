const { Schema, model, mongoose } = require('mongoose');
const Product = require('./product-model');
const { Address } = require('braintree');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.ObjectId,
        ref: 'User',
    },
    products: [{
        type: mongoose.ObjectId,
        ref: 'Product',

    }],
    status: {
        type: String,
        default: "not process",
        enum: ['not process', 'processing', 'shipped', 'delivered', 'cancel'],

    },
    shipping_address: [{
        username: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        zip: String
    }],
    payment: {

    },
    amount:{
        type:String
    }

}, { timeStamps: true })


const Order = new model("Order", orderSchema);
module.exports = Order;