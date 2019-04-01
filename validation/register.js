const Validator=require('validator')
const isEmpty=require('./is-empty')

const validateRegisterInput=(data)=>{
    let error={}
    if(!Validator.isEmpty(data.name,{min:2,max:30})){
        error.name='Name must be between 2 and 30'
       }


    return {
        error,
        isValid:isEmpty(error)
    }
}

module.exports=validateRegisterInput; 