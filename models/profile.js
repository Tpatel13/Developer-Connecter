const mongoose=require('mongoose')

const Schema =mongoose.Schema;

//create Schema

const ProfileSchema=new Schema({
      
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    handle:{
        type: String,
        required:true,
        max:40
    },
    company:{
        type:String,
        required:false
    },
    website:{
        type:String,
        required:false
    },
    location:{
        type:String

    },
    status:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    bio:{
        type:String,
        required:false
    },
    gitusername:{
        type:String,
    },
    experience:[
        {
            title:{
                type:String,
                required:true
            },
            company:{
                type:String,
                required:true
            },
            location:{
                type:String
            },
            from:{
            type:Date,
             required:true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            }

        }
    ],
    education:[
        {
            school:{
                type:String,
                required:true
            },
            degree:{
                type:String,
                required:true
            },
            fieldofstudy:{
                type:String,
                required:true
            },
            from:{
            type:Date,
             required:true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            }

        }
    ],
    social:{
        youtube:{
            type:String
        }
    }
    ,
    date:{
        type:Date,
        require:true
    }




})


module.exports=Profile=mongoose.model('profile',ProfileSchema)
