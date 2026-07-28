import {

createBooking,
getUserBookings,
getTrainerBookings,
findBookingById,
updateBookingStatus,
deleteBooking

}
from "../repositories/booking.repository.js";



export const bookTrainer = async(
userId,
data
)=>{


return createBooking({

    userId,

    ...data,

});


};





export const myBookings = async(
userId
)=>{


return getUserBookings(
    userId
);


};





export const trainerBookings = async(
trainerId
)=>{


return getTrainerBookings(
    trainerId
);


};





export const changeStatus = async(
id,
status
)=>{


const booking =
await findBookingById(id);



if(!booking){

throw new Error(
"Booking not found"
);

}



return updateBookingStatus(
id,
status
);


};





export const cancelBooking = async(
id
)=>{


return deleteBooking(id);


};