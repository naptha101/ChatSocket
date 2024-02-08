const express=require('express');
const cors=require('cors')
const mongoose=require('mongoose');
const userRoute=require('./routes/userRoute');
const messageRoute=require('./routes/messageRoutes')
const socket=require('socket.io');
const fileupload=require('express-fileupload')
const app=express();

require('dotenv').config();
app.use(cors());
app.use(express.json())
const connect=async ()=>{
 await mongoose.connect('mongodb+srv://Yash:planyash@cluster0.atmv6bc.mongodb.net/?retryWrites=true&w=majority').then((e)=>{
    console.log("connected "+e.connection.id);
 })}
 mongoose.connection.on('connected',()=>{
   console.log('connected')
 })
 app.use(fileupload({
  useTempFiles:true
 }))
  app.use('/api/auth',userRoute);
  app.use('/api/messages',messageRoute);
const server=app.listen(5000,()=>{console.log("helllo i am hehre")
connect();
})
const io=socket(server,{
  cors:{
    origin:"http://localhost:3000",
    Credential:true

  }
})
global.onlineUsers=new Map();
io.on("connection",(socket)=>{
  global.chatSocket=socket;
  socket.on("add-user",(userId)=>{
    console.log(userId);
    onlineUsers.set(userId,socket.id);
  })
  socket.on("send-msg",(data)=>{
    const sendUserSocket=onlineUsers.get(data.to);
    console.log(sendUserSocket);
    if(sendUserSocket){

      socket.to(sendUserSocket).emit("msg-recieved",{message:data.msg,isImageSet:data.isImage,Image:data.Image,updatedAt:data.updatedAt});
    }

  })

})