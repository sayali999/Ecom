const express = require('express');
const router = express.Router();
const authcontrollers = require('../../controller/User-controller/user-controller');
const signupSchema = require("../../validators/auth-validator");
const validate = require('../../middlewares/validate-middleware');
const authMiddleware = require('../../middlewares/authMiddleware');




router.route('/user/register').post(validate(signupSchema), authcontrollers.register);

router.route('/user/login').post(authcontrollers.login);

//adress 
router.route('/user/:id').put(authcontrollers.userupdate);

//updateaddress
router.route('/user/shipping_address/:id').patch(authcontrollers.useraddressupdate)

router.route('/user').get( authcontrollers.user);

router.route('/user/update/:id').put(authcontrollers.loginuserupdate);

// router.route('/address/:id').get( authcontrollers.useraddress);

module.exports = router;