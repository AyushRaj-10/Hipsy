import User from "../models/User.js";

export const findByEmail = async(email) => {
  return User.findOne({ email });
};

export const createUser = async(data) => {
  return User.create(data);
};

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
            new:true,
            runValidators:true
        }
    );

};



export const deleteUser = async(id)=>{

    return User.findByIdAndDelete(id);

};
