import {

createNotification,
getUserNotifications,
markAsRead,
deleteNotification

}
from "../repositories/notification.repository.js";



export const sendNotification = async(data)=>{

    return createNotification(data);

};




export const getNotifications = async(userId)=>{

    return getUserNotifications(
        userId
    );

};




export const readNotification = async(id)=>{

    return markAsRead(id);

};




export const removeNotification = async(id)=>{

    return deleteNotification(id);

};