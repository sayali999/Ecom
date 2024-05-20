const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
//home logic

const home = async (req, res) => {
    try {
        res.status(200).json("welcome to home router");
    } catch (error) {
        console.log(error);
    }
}

//register
const register = async (req, res) => {
    try {
        // console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "email already exists" });
        }

        const userCreated = await User.create({ username, email, phone, password });

        res.status(200).send({
            msg: "Registraion Succesfull", token: await userCreated.generateToken(), userId:
                userCreated._id.toString()
        });
    } catch (error) {
        // res.status(400).send({ msg: "page not found" });
        next(error);
    }
}

//login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExit = await User.findOne({ email });

        if (!userExit) {
            return res.status(400).json({ msg: "invalid credentials" });
        }

        const user = await userExit.comparePassword(password);
        // const user = await bcrypt.compare(password,userExit.password);

        if (user && userExit.role === 'admin') {
            res.status(200).json({
                message: "Login Successfull", token: await userExit.generateToken(), user: userExit
            });
        }
        else {
            res.status(401).json({ msg: "Invalid email or password" });
        }

    } catch (error) {
        res.status(400).json({ msg: "page not found" });
    }
}

//user logic

const user = async (req, res) => {
    try {
        const userData = req.user;
        // console.log(userData);
        return res.status(200).json({ userData });

    } catch (error) {
        console.log("error from user route");
    }
}

module.exports = { home, register, login, user }