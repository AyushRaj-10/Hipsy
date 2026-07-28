import mongoose from "mongoose";


const trainerSchema = new mongoose.Schema(
{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },


    specialization:{
        type:String,
        required:true
    },


    experience:{
        type:Number,
        required:true
    },


    bio:{
        type:String,
        default:""
    },


    location:{
        type:String,
        default:""
    },


    price:{
        type:Number,
        default:0
    },


    rating:{
        type:Number,
        default:0
    },


    totalReviews:{
        type:Number,
        default:0
    },


    isVerified:{
        type:Boolean,
        default:false
    }


},
{
    timestamps:true
});


export default mongoose.model(
    "Trainer",
    trainerSchema
);