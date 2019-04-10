const express=require('express');
const router=express.Router();
const mongoose=require('mongoose')
const passport=require('passport');

const Post=require('../../models/Post')

//Testing link
router.post('/test',(re,res)=>{
    

    res.json({msg:'Profile works'});

});


router.post('/',passport.authenticate('jwt',{session:false},),(req,res)=>{
   
   const newPost=new Post({
        text:req.body.text,
        name:req.body.name,
        //avatar:req.body.name,
        user:req.user.id,

   })

   newPost.save().then(post=>res.json({post}));



})




module.exports=router