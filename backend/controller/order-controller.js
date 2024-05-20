
const orderModel = require('../models/order-model');

var braintree = require("braintree");
const { log } = require('console');


require("dotenv").config();


var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


//token
const braintreeTokenController = async (req, res) => {
    try {
        await gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        })

    } catch (error) {
        console.log(error);

    }
}

//payment
const braintreePaymentController = async (req, res) => {

    try {
        const { cartItems, nonce, user, address } = req.body;
        console.log(user);
      
        let total = 0;
        cartItems.map((i) => {
            total += i.price
        });

        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },

            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cartItems,
                        payment: result,
                        customer: user,
                        shipping_address: address,
                        amount:total
                    }).save()
                    res.json({ ok: true })
                }
                else {
                    res.status(500).send(error)
                }
            }

        )

    } catch (error) {
        console.log(error);

    }
}

//get all order
const getAllOrder = async (req, res) => {
    try {

        const order = await orderModel.find({}).populate('customer');
        res.status(200).send({
            success: true,
            count: order.length,
            message: "All order List",
            order
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error while getting all product"
        })

    }
}

//get order by user id
const getUserOrder = async (req,res) =>{
    try {
        
        const order = await orderModel.find({customer:req.params.id}).populate('customer','username').populate("products","-photo");
        res.status(200).send({
            success: true, 
            message: "All user order List",
            order
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error while getting order by user id"
        })

    }
}

module.exports = { braintreeTokenController, braintreePaymentController, getAllOrder, getUserOrder };