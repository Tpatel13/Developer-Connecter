const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs')
const User=require('../../models/User.js')
const jwt =require('jsonwebtoken')
const keys=require('../../config/keys.js')
const passport=require('passport')
const validateRegisterInput=require('../../validation/register.js')
router.post('/register',(req,res)=>{
    
    const {error,isValid}=validateRegisterInput(req.body)
   
    if(!isValid){
        res.status(400).json({error})
    }
    User.findOne({email:req.body.email}).then(user=>{
               if(user){
                 
           return res.status(400).json({email:'User already exists'})
               }
               else{
                   
                   const newUser=new User({
                       name:req.body.name,
                       email:req.body.email,
                       date:req.body.date,
                       password:req.body.password
                   })
                   bcrypt.genSalt(10,(err,salt)=>{
                          
                          bcrypt.hash(newUser.password,salt,(err,hash)=>{
                              newUser.password=hash; 

                              newUser.save().then((user)=>{console.log('Saved in database');res.json(user)}).catch(e=>console.log(e))
                          })

                    }).catch(e=>{
                        console.log(e)
                    })

                 
               }
           })
})

router.get('/current',passport.authenticate('jwt',{ session:false }),(req,res)=>{
    res.json(req.user)
})


router.post('/login',(req,res)=>{
    
     const email=req.body.email,password=req.body.password;
     User.findOne({email})
     .then(user=>{
         //check user
         if(!user)return res.json({email:'email not Found'})
         //check Password
         bcrypt.compare(password,user.password).then(isMatch=>{
             if(isMatch){
                 const payload={id:user.id,name:user.name}
                 //User matched

                 jwt.sign(payload,keys.key,{expiresIn:3600},(err,token)=>{
                   token='baerer '+token
                    res.json({token})
                 })
                
               
             }
             else 
             {
                 return res.json({msg:"Password is incorrect"})
             }
         })
     })
     






})
module.exports=router