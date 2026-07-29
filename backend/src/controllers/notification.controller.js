import * as notificationService
from "../services/notification.service.js";
import * as bookingService from "../services/booking.service.js";


import {
success
}
from "../utils/response.js";



export const getAll = async(
req,
res,
next
)=>{


try{


await bookingService.syncExpiredBookings(
    {
        userId: req.user.id
    }
);


const notifications =
await notificationService.getNotifications(
    req.user.id
);



return success(
    res,
    "Notifications fetched",
    notifications
);


}
catch(err){

next(err);

}

};





export const read = async(
req,
res,
next
)=>{


try{


const notification =
await notificationService.readNotification(
    req.params.id
);



return success(
    res,
    "Notification marked as read",
    notification
);


}
catch(err){

next(err);

}

};





export const remove = async(
req,
res,
next
)=>{


try{


await notificationService.removeNotification(
    req.params.id
);



return success(
    res,
    "Notification deleted"
);


}
catch(err){

next(err);

}

};
