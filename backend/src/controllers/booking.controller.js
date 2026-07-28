import * as bookingService
from "../services/booking.service.js";


import {
success
}
from "../utils/response.js";



export const create = async(
req,res,next
)=>{

try{


const booking =
await bookingService.bookTrainer(
    req.user.id,
    req.body
);


return success(
res,
"Booking created",
booking,
201
);


}
catch(err){

next(err);

}

};





export const myBookings = async(
req,res,next
)=>{

try{


const bookings =
await bookingService.myBookings(
    req.user.id
);



return success(
res,
"Bookings fetched",
bookings
);


}
catch(err){

next(err);

}

};





export const updateStatus = async(
req,res,next
)=>{

try{


const booking =
await bookingService.changeStatus(
req.params.id,
req.body.status
);



return success(
res,
"Booking updated",
booking
);


}
catch(err){

next(err);

}

};





export const cancel = async(
req,res,next
)=>{

try{


await bookingService.cancelBooking(
req.params.id
);



return success(
res,
"Booking cancelled"
);


}
catch(err){

next(err);

}

};