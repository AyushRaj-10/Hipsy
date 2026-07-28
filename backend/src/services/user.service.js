import {
    findById,
    updateUser,
    deleteUser
}
from "../repositories/user.repository.js";



export const getProfile = async(id)=>{


    const user = await findById(id)
        .select("-password");


    if(!user){

        throw new Error(
            "User not found"
        );

    }


    return user;

};




export const updateProfile = async(
    id,
    data
)=>{

    const user = await updateUser(
        id,
        data
    );

    if (!user) {
        throw new Error("User not found");
    }

    const userObj = user.toObject();
    delete userObj.password;

    return userObj;

};




export const removeAccount = async(id)=>{


    await deleteUser(id);


    return true;

};