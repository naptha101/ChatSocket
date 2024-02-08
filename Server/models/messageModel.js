const mongoose=require('mongoose');
const message=new mongoose.Schema({
message:{
text:{
    type:String,
    required:false 
},
isImageSet:{
    type:Boolean,
    default:false,
},
Image:{
   type:String,
    default:"",
}
},
users:Array,
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
},
{
    timestamps:true,
}

);
module.exports=mongoose.model("Messages",message);