
const Contact = require('../models/contact-model');

const contactForm = async (req, res) => {
    try {
        const { username, email, subject, message } = req.body;
        const contact = await Contact.create({ username, email, subject, message });
        return res.status(200).send({ success: true, message: "Message send successfully", contact })

    } catch (error) {
        return res.status(400).send({ message: "Message not delivered" })
    }
};

const getMessage = async (req, res) => {
    try {
        const messages = await Contact.find({});
        res.status(200).send({
            success: true,
            count: messages.length,
            message: "All order List",
            messages
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error while getting all message"
        })

    }

}

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
       
        await Contact.findByIdAndDelete(id);
        res.status(200).send({ success: true, message: "Delete Message Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error while deleting category" })
    }
}

module.exports = { contactForm, getMessage, deleteMessage };




