const mongoose=require('mongoose');
const user=new mongoose.Schema({
username:{
    type:String,
    max:20,
    min:3,
    required:true,
    unique:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    max:20,
    min:3,
    required:true,
},
isAvatarImageSet:{
    type:Boolean,
    default:false,
},
avatarImage:{
    type:String,
    default:"",
}


});
module.exports=mongoose.model("User",user);