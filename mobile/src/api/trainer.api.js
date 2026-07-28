import API from "./axios";


export const getTrainers = async()=>{

    const response =
    await API.get(
        "/trainers"
    );


    return response.data;

};



export const getTrainerById = async(id)=>{


    const response =
    await API.get(
        `/trainers/${id}`
    );


    return response.data;

};