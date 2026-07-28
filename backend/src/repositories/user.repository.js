import User from "../models/User.js";


export const findById = async(id)=>{

    return User.findById(id);

};



export const updateUser = async(
    id,
    data
)=>{

    return User.findByIdAndUpdate(
        id,
        data,
        {
            new:true
        }
    );

};



export const deleteUser = async(id)=>{

    return User.findByIdAndDelete(id);

};