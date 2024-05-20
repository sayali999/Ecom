const User = require('../models/user-model');
//get user data
const getAllUsers = async (req,res) =>{
 try {
    const users = await User.find({},{password:0});
    // console.log(users)
    if(!users || users.length === 0){
      return  res.status(404).json({message : "No Records Found"});

    }
     return res.status(200).json(users);
 } catch (error) {
    next(error);
 }
}

//delete user by id
const deleteUserById = async (req,res) =>{
   try {
      const id = req.params.id;
       await User.deleteOne({_id:id});
       return  res.status(200).json({message : "User Deleted Successfully"});

   } catch (error) {
      next(error);
   }

}

module.exports = {getAllUsers,deleteUserById};