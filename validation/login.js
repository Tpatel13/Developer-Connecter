const Validator=require('validator')
const isEmpty=require('./is-empty')

const validateLoginInput=(data)=>{
     
    data.email = !isEmpty(data.email)?data.email:'';
    data.password = !isEmpty(data.password)?data.password:'';
    let errors={}
   
    
    if(Validator.isEmpty(data.email)){
        errors.email='Email is empty'
    }
    if(!Validator.isEmail(data.email) ){
        
        errors.email='Email is not valid'
    }
    if(Validator.isEmpty(data.password)){
        errors.password='Password is Required!!'
    }
    
    return {
        errors,
        isValid:isEmpty(errors)
    }
}

module.exports=validateLoginInput; 