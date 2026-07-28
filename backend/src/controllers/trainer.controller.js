import * as trainerService 
from "../services/trainer.service.js";


import {
    success
}
from "../utils/response.js";




export const createProfile = async(
req,res,next)=>{


try{


const trainer =
await trainerService.createProfile(
    req.user.id,
    req.body
);



return success(
    res,
    "Trainer profile created",
    trainer,
    201
);


}
catch(err){

next(err);

}

};





export const getProfile = async(
req,res,next)=>{


try{


const trainer =
await trainerService.getProfile(
    req.user.id
);


return success(
    res,
    "Trainer profile",
    trainer
);


}
catch(err){

next(err);

}

};






export const updateProfile = async(
req,res,next)=>{


try{


const trainer =
await trainerService.updateProfile(
    req.user.id,
    req.body
);


return success(
    res,
    "Trainer updated",
    trainer
);


}
catch(err){

next(err);

}

};






export const getAll = async(
req,res,next)=>{


try{


const trainers =
await trainerService.getTrainers();



return success(
    res,
    "Trainers fetched",
    trainers
);


}
catch(err){

next(err);

}

};





export const getOne = async(
req,res,next)=>{


try{


const trainer =
await trainerService.getTrainer(
    req.params.id
);



return success(
    res,
    "Trainer fetched",
    trainer
);


}
catch(err){

next(err);

}

};