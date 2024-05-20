const mongoose  = require("mongoose")

const URI =process.env.MONGODB_URI;

mongoose.connect(URI);

const coonectDb = async () =>{
    try {
        await mongoose.connect(URI);
        console.log("Database connection successfully");
    } catch (error) {
        console.log("Database connection failed");
        process.exit(0);
    }
}

module.exports = coonectDb;