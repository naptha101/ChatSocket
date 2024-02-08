const messageMod=require('../models/messageModel')
const bcrypt=require('bcrypt');
const cloudinary=require('cloudinary').v2;

          
cloudinary.config({ 
  cloud_name: 'dneeum0v1', 
  api_key: '951164984623356', 
  api_secret: 'YC86zF3N1b5Ue0EhxX5GjK2SoOg' 
});
module.exports.addMessage=async (req,res,next)=>{
 try{
const data=req.body;
//res.json(req.body);

if(data.isImage==="true"){
await cloudinary.uploader.upload(req.files.Image.tempFilePath, async (err,result)=>{
   if(result){
      try{ 
   const dat=await messageMod.create({
      message:{text:data.message,isImageSet:data.isImage,Image:result.url},
       users:[data.from,data.to],
       sender:data.from
   });
   res.json(dat);

}
catch(err){
   res.json(err);
}
}else{  
   res.json(err);
}

})
//res.json(data.isImage);
}else{
   try{ 
      const dat=await messageMod.create({
         message:{text:data.message,isImageSet:data.isImage,Image:""},
          users:[data.from,data.to],
          sender:data.from
      });
      res.json(dat);
   
   }
   catch(err){
      res.json(err);
   }

}
// if(data)res.send(data);
// else res.send({msg:"Error in Message"})
 }  catch(err){
    next(err);
 }
 
}
module.exports.getAllMessage=async (req,res,next)=>{
try{
   const {from,to}=req.body;
   const messages=await messageMod.find({
      users:{
         $all:[from,to]
      },
   }).sort({updatedAt:1});
   const projestMess=messages.map((msg)=>{
      return {
         fromSelf:msg.sender.toString()===from,
         message:msg.message.text,
         Image:msg.message.Image,
         isImageSet:msg.message.isImageSet,
         updatedAt:msg.updatedAt
      }
   })
   res.json(projestMess);
}
catch(err){
next(err);
}
}


