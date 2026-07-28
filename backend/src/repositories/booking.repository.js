import Booking from "../models/Booking.js";


export const createBooking = async(data)=>{

    return Booking.create(data);

};



export const getUserBookings = async(userId)=>{

    return Booking.find({
        userId
    })
    .populate(
        "trainerId"
    );

};



export const getTrainerBookings = async(trainerId)=>{

    return Booking.find({
        trainerId
    })
    .populate(
        "userId",
        "name email profileImage"
    );

};



export const findBookingById = async(id)=>{

    return Booking.findById(id);

};



export const updateBookingStatus = async(
    id,
    status
)=>{

    return Booking.findByIdAndUpdate(
        id,
        {
            status
        },
        {
            new:true
        }
    );

};



export const deleteBooking = async(id)=>{

    return Booking.findByIdAndDelete(id);

};