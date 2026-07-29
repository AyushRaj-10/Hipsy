import API from "./axios";

const unwrap = (response) => response.data?.data ?? response.data;


export const registerUser = async(data)=>{


    const response =
    await API.post(
        "/auth/register",
        data
    );


    return unwrap(response);

};




export const loginUser = async(data)=>{


    const response =
    await API.post(
        "/auth/login",
        data
    );


    return unwrap(response);

};
