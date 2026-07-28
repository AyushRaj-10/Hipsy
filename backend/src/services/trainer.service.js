import {
    createTrainer,
    findTrainerByUserId,
    updateTrainer,
    getAllTrainers,
    getTrainerById
}
from "../repositories/trainer.repository.js";



export const createProfile = async(
    userId,
    data
)=>{


    const existing =
        await findTrainerByUserId(
            userId
        );


    if(existing){

        throw new Error(
            "Trainer profile already exists"
        );

    }



    return createTrainer({

        userId,

        ...data

    });

};





export const getProfile = async(
    userId
)=>{


    const trainer =
        await findTrainerByUserId(
            userId
        );


    if(!trainer){

        throw new Error(
            "Trainer profile not found"
        );

    }


    return trainer;

};





export const updateProfile = async(
    userId,
    data
)=>{


    return updateTrainer(
        userId,
        data
    );

};





export const getTrainers = async()=>{

    return getAllTrainers();

};





export const getTrainer = async(id)=>{

    return getTrainerById(id);

};