const jwt = require('jsonwebtoken');
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
    }

    
    const jwtToken = token.replace("Bearer","").trim();
    try {

        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRETE_KEY);

        const userData = await User.findOne({email: isVerified.email});
        console.log(userData); 
        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        next();
    } catch (error) {
        console.log("token from auth middleware", jwtToken);
        
    }

   
}

module.exports = authMiddleware;