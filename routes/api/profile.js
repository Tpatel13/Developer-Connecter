const express=require('express');
const router=express.Router();
const mongoose=require('mongoose')
const passport=require('passport');

//Load profile model
const Profile=require('../../models/profile');
//load user model
const User=require('../../models/User')


router.post('/test',(re,res)=>{
    

    res.json({msg:'Profile works'});

});

//Get current user 
router.post('/',passport.authenticate('jwt',{ session:false }),(req,res)=>{
    let errors={},profileFields={};
    //validate the input 
    //

   
    //Put inputs in Object
    if(req.body.handle)profileFields.handle=req.body.handle;
    if(req.body.company)profileFields.company=req.body.company;
    if(req.body.website)profileFields.website=req.body.website;
    if(req.body.location)profileFields.location=req.body.location;
    if(req.body.bio)profileFields.bio=req.body.bio;
    if(req.body.status)profileFields.status=req.body.status;
    if(req.body.gitusername)profileFields.gitusername=req.body.gitusername;
    //Skills-split info array 
    if(typeof req.body.skills !=='undefined'){
        profileFields.skills=req.body.skills.split(',');
    }
   //social
   profileFields.social={}
    if(req.body.youtube)profileFields.social.youtube=req.body.youtube



    Profile.findOne({user:req.user.id}).populate('users',['name']).then(profile=>{
       
      if(profile){
          Profile.findByIdAndUpdate({user:req.user.id},{$set:profileFields},{new:true})
          .then(profile=>{
              res.json(profile)
          })
      }
      else{
          //create
          //Check if handle exists
          Profile.findOne({handle:profileFields.handle})
          .then(profile=>{
              if(profile){
                  errors.handle='Handle Already exists'
                  res.status(400).json(errors)
              }
              //Save Profile
              else{
                  new Profile(profileFields).save().then(profile=>{res.json(profile)})
              }
          }).catch(e=>console.log(e))
      }
    }).catch(e=>console.log(e))
  
})



//user Handle
router.get('/handle/:handle',(req,res)=>{
 let errors={}
    Profile.findOne({handle:req.params.handle})
    .populate('user',['name'])
    .then(profile=>{

        if(!profile){
            errors.noprofile="There is no profile created"
            res.send(errors);
        }
        res.json(profile)

    })

})


module.exports= router;