import Notification from "../models/Notification.js";


export const createNotification = async(data)=>{

    return Notification.create(data);

};



export const getUserNotifications = async(userId)=>{

    return Notification.find({
        userId
    })
    .sort({
        createdAt:-1
    });

};



export const markAsRead = async(id)=>{

    return Notification.findByIdAndUpdate(
        id,
        {
            isRead:true
        },
        {
            new:true
        }
    );

};



export const deleteNotification = async(id)=>{

    return Notification.findByIdAndDelete(id);

};