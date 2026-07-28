import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    password:{
        type:String,
        required:true
    },


    phone:{
        type:String
    },


    profileImage:{
        type:String,
        default:""
    },


    age:{
        type:Number
    },


    gender:{
        type:String,
        enum:[
            "MALE",
            "FEMALE",
            "OTHER"
        ]
    },


    fitnessGoal:{
        type:String,
        enum:[
            "WEIGHT_LOSS",
            "MUSCLE_GAIN",
            "GENERAL_FITNESS",
            "ENDURANCE"
        ]
    },


    role:{
        type:String,
        enum:[
            "USER",
            "TRAINER",
            "ADMIN"
        ],
        default:"USER"
    }

},
{
    timestamps:true
}
);


export default mongoose.model(
    "User",
    userSchema
);