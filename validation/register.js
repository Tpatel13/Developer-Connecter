const Validator=require('validator')
const isEmpty=require('./is-empty')

const validateRegisterInput=(data)=>{
     
    data.name= !isEmpty(data.name)?data.name:'';
    data.email = !isEmpty(data.email)?data.email:'';
    data.password = !isEmpty(data.password)?data.password:'';
    data.password2= !isEmpty(data.password2)?data.password2:'';
    let errors={}
    if(Validator.isEmpty(data.name,{min:2,max:30})){
        errors.name='Name must be between 2 and 30'
    }

    if(Validator.isEmpty(data.name)){
        errors.name='name is empty'
    }
    
    if(Validator.isEmpty(data.email)){
        errors.email='Email is empty'
    }
    if(!Validator.isEmail(data.email)){
       
        errors.email='Email is not valid'
    }
    if(Validator.isEmpty(data.password)){
        errors.password='Password is Required!!'
    }
    if(Validator.isEmpty(data.password,{min:6,max:30})){
        errors.password='Password must be atleast 6 chars '
    }
    if(Validator.isEmpty(data.password2)){
        errors.password2='Password2 is Required!!'
    }
    
    
    return {
        errors,
        isValid:isEmpty(errors)
    }
}

module.exports=validateRegisterInput; 