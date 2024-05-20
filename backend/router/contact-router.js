const express = require('express');
const router = express.Router();
const contact = require('../controller/contact-controller');



router.route('/contact').post(contact.contactForm);
router.route('/getmessage').get(contact.getMessage);
router.route('/deletemessage/:id').delete(contact.deleteMessage);

module.exports = router;