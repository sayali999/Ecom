const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    shipping_address: [{
        username: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        zip: String
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

//hash password
userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;

    } catch (error) {
        next(error);
    }
});

//compare password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

//json web token
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
            process.env.JWT_SECRETE_KEY,
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        console.log(error);
    }
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
