const express = require('express')
const mongoose =require('mongoose')
//db config
const db=require('./config/keys').mongoURI

const profile=require('./routes/api/profile')
const users=require('./routes/api/users')
const posts=require('./routes/api/posts')


const port=process.env.port || 3000
const app=express();

mongoose
       .connect(db)
       .then((e)=>{console.error('Connected')})
       .catch(e=>{console.log('Connection error'+e)});




app.get('/',(req,res)=>{
   res.send()
})


app.use('/api/users',users)
//app.use('api/profile',profile)
//app.use('api/posts',posts)

app.listen(process.env.port ||3000,()=>{console.log('server started on ',port )})