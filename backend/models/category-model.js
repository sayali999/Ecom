const {Schema,model} = require('mongoose');

const categorySchema = new Schema({
    name:{
        type: String,
        required:true
    },
    slug:{
        type:String,
        lowercase: true
    }
});

const Category = new model("Category",categorySchema);
module.exports = Category;