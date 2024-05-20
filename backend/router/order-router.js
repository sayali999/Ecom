const express = require('express');
const router = express.Router();
const orderController = require('../controller/order-controller');

//payment route
//token

router.route('/braintree/token').get(orderController.braintreeTokenController);

// payment
router.route('/braintree/payment').post(orderController.braintreePaymentController);

//all order
router.route('/getall-order').get(orderController.getAllOrder);

//get order by user id
router.route('/getuser-order/:id').get(orderController.getUserOrder);

module.exports = router;
