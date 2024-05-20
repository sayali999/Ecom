const User = require("../../models/user-model");
const bcrypt = require("bcryptjs");


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
            msg: "User Registraion Succesfull", token: await userCreated.generateToken(), userId:
                userCreated._id.toString()
        });
    } catch (error) {
        // res.status(400).send({ msg: "page not found" });
        // next(error);
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

        if (user && userExit.role === 'user') {

            res.status(200).json({
                message: "User Login Successfull", token: await userExit.generateToken(), user: userExit
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
        console.log(userData);
        return res.status(200).json({ userData });

    } catch (error) {
        console.log("error from user route");
    }
}


//update
const userupdate = async (req, res) => {
    try {
        const { username, phone, address, city, state, zip } = req.body;
        const { id } = req.params;
        const user = await User.updateOne({ _id: id }, { $push: { "shipping_address": { username, phone, address, city, state, zip } } })
        res.status(200).send({ success: true, message: "address Updated Successfully", user });

    } catch (error) {

    }
}

// get user address
const useraddressupdate = async (req, res) => {
    try {
        const  addressid  = req.params.id;
        const result = await User.findOneAndUpdate({'shipping_address._id':addressid},{$set:{'shipping_address.$':req.body}},{new:true});
        // const { username, phone, address, city, state, zip } = req.body;
        // const { id } = req.params;
        // const user = await User.updateOne({ _id: id }, { $set: { "shipping_address": { username, phone, address, city, state, zip } } })
        console.log(result);
        res.status(200).send({ success: true, message: "address Updated Successfully", result });

    } catch (error) {

    }
}

//login user update
const loginuserupdate = async (req, res) => {
    try {
        const { username, phone, email,lastname } = req.body;
        const  {id}  = req.params;
        const user = await User.findById({_id:id});
       
        const updateuser = await User.findByIdAndUpdate({_id:id} , {  
            username:username || user.username, 
            phone:phone || user.phone, 
            email:email || user.email,
            lastname:lastname || user.lastname},
            {new:true})
        res.status(200).send({ success: true, message: "user Updated Successfully", updateuser });

    } catch (error) {
        console.log(error);
    }

}

module.exports = { register, login, user, userupdate, loginuserupdate,useraddressupdate }