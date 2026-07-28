import API from "./axios";


export const addReview = async(data)=>{

    const response =
    await API.post(
        "/reviews",
        data
    );

    return response.data;

};



export const getTrainerReviews = async(trainerId)=>{


    const response =
    await API.get(
        `/reviews/trainer/${trainerId}`
    );


    return response.data;

};