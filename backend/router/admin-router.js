const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin-controller');

router.route('/users').get(adminController.getAllUsers);
router.route('/users/delete/:id').delete(adminController.deleteUserById);

module.exports = router;