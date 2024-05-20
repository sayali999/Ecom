const {Schema,model,mongoose} = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    category:{
        type: mongoose.ObjectId,
        ref: 'Category',
        required: true
    },
    
    slug:{
        type:String,
        lowercase: true
    }
});

const SubCategory = new model("SubCategory",subCategorySchema);
module.exports = SubCategory;