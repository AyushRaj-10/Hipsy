import Trainer from "../models/Trainer.js";



export const createTrainer = async(data)=>{

    return Trainer.create(data);

};



export const findTrainerByUserId = async(userId)=>{

    return Trainer.findOne({
        userId
    })
    .populate(
        "userId",
        "name email profileImage"
    );

};



export const updateTrainer = async(
    userId,
    data
)=>{

    return Trainer.findOneAndUpdate(
        {
            userId
        },
        data,
        {
            new:true
        }
    );

};



export const getAllTrainers = async()=>{

    return Trainer.find()
        .populate(
            "userId",
            "name profileImage"
        );

};



export const getTrainerById = async(id)=>{

    return Trainer.findById(id)
    .populate(
        "userId",
        "name profileImage"
    );

};