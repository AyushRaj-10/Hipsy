import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema(
{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    trainerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Trainer",
        required:true
    },


    date:{
        type:Date,
        required:true
    },


    time:{
        type:String,
        required:true
    },


    status:{
        type:String,
        enum:[
            "PENDING",
            "ACCEPTED",
            "REJECTED",
            "CANCELLED"
        ],
        default:"PENDING"
    },


    message:{
        type:String,
        default:""
    },


    paymentStatus:{
        type:String,
        enum:[
            "UNPAID",
            "PAID"
        ],
        default:"UNPAID"
    }

},
{
    timestamps:true
});


export default mongoose.model(
    "Booking",
    bookingSchema
);