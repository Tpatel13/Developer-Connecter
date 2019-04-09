const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs')
const User=require('../../models/User.js')
const jwt =require('jsonwebtoken')
const keys=require('../../config/keys.js')
const passport=require('passport')
const validateRegisterInput=require('../../validation/register.js')
const validateLoginInput=require('../../validation/login.js')

router.post('/register',(req,res)=>{
    
    const {errors,isValid}=validateRegisterInput(req.body)
  
    if(!isValid){
        res.status(400).json({errors})
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
     const {errors,isValid}=validateLoginInput(req.body);
     if(!isValid){
       return res.status(400).json({errors});
     }

     User.findOne({email})
     .then(user=>{
         //check user
         errors.email='Email not found '
         if(!user)return res.json({email:errors.email})
         //check Password
         bcrypt.compare(password,user.password).then(isMatch=>{
             if(isMatch){
                 const payload={id:user.id,name:user.name}
                 //User matched

                 jwt.sign(payload,keys.key,{expiresIn:88800},(err,token)=>{
                   token='Bearer '+token
                    res.json({token})
                 })
                
               
             }
             else
             {
                 errors.password='Password is Incorrect'
                 return res.json({password:errors.password})
             }
         })
     })
     






})
module.exports=router