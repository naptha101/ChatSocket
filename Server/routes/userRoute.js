const express=require('express');
const { register ,login,setAvatar,getAll,update} = require('../controllers/userController');
const router=express.Router();
router.post('/register',register);
router.post('/login',login);
router.put('/update',update);
router.post('/setAvatar/:id',setAvatar);
router.get('/getall/:id',getAll);
module.exports=router;