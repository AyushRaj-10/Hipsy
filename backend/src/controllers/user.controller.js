import * as userService from "../services/user.service.js";

import {
    success
}
from "../utils/response.js";



export const getProfile = async(
    req,
    res,
    next
)=>{

    try{


        const user =
            await userService.getProfile(
                req.user.id
            );


        return success(
            res,
            "Profile fetched",
            user
        );


    }
    catch(err){

        next(err);

    }

};





export const updateProfile = async(
    req,
    res,
    next
)=>{


    try{


        const user =
            await userService.updateProfile(
                req.user.id,
                req.body
            );


        return success(
            res,
            "Profile updated",
            user
        );


    }
    catch(err){

        next(err);

    }

};





export const deleteAccount = async(
    req,
    res,
    next
)=>{


    try{


        await userService.removeAccount(
            req.user.id
        );


        return success(
            res,
            "Account deleted"
        );


    }
    catch(err){

        next(err);

    }

};