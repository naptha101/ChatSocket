const User=require('../models/userModels')
const bcrypt=require('bcrypt');

module.exports.register=async (req,res,next)=>{
    try{
 const {username,email,password}=req.body;
 const checku=await User.findOne({username:username});
 const checkw=await User.findOne({email:email});
 if(checku||checkw){
    res.json({message:"user already exist with same username or email",status:false});
 }
 const hashedpass=await bcrypt.hash(password,10);
 const user=await User.create({username,
email,password:hashedpass});
delete user.password;
res.status(200).json({status:true,user});}
catch(err){ 
    next(err);
}
}
module.exports.update = async (req, res, next) => {
    try {
        const data = req.body;
        const user = await User.findOne({ _id: data._id });
        if (user.password && data.password) {
           
            const isPasswordMatch = await bcrypt.compare(data.password, user.password);

            if (isPasswordMatch) {
                const hash = await bcrypt.hash(data.newpassword, 10);
                const updt=await User.findByIdAndUpdate(user._id,{username:data.username,email:data.email,password:hash,avatarImage:data.avatarImage,isAvatarImageSet:data.isAvatarImageSet}, { new: true })
                res.json({status:true, User: updt })
            } else {
                res.json({ status:false,message: "Passwords do not match" });
            }
        } else {
            res.status(400).json({ status:false,message: "Missing password fields" });
        }
    } catch (err) {
        next(err);
    }
}


module.exports.login=async (req,res,next)=>{
    try{
 const {username,password}=req.body;
 const user=await User.findOne({username:username});
if(!user){
res.json({message:"user is Not found",status:false});
}

 const confirm=await bcrypt.compare(password,user.password);
 if(!confirm){
    res.json({message:"password is not matching",status:false});
 }

delete user.password;
res.status(200).json({status:true,user});}
catch(err){ 
    next(err);
}
}
module.exports.setAvatar=async (req,res,next)=>{
    try{
const id=req.params.id;
const img=req.body.image;
const user=await User.findByIdAndUpdate(id,{
    isAvatarImageSet:true,
    avatarImage:img
})
return res.json({isSet:user?.isAvatarImageSet,image:user?.avatarImage});

}
catch(err){ 
    next(err);
}
}
module.exports.getAll=async (req,res,next)=>{
    try{
 const id=req.params.id;
const All=await User.find({_id:{$ne:id}});
//const All=await User.find();
res.status(200).json(All);

}
catch(err){ 
    next(err);
}
}