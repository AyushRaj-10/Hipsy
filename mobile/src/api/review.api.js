import API from "./axios";

const unwrap = (response) => response.data?.data ?? response.data;


export const addReview = async(data)=>{

    const response =
    await API.post(
        "/reviews",
        data
    );

    return unwrap(response);

};



export const getTrainerReviews = async(trainerId)=>{


    const response =
    await API.get(
        `/reviews/trainer/${trainerId}`
    );


    return unwrap(response);

};

export const updateReview = async(id, data)=>{
    const response =
    await API.put(
        `/reviews/${id}`,
        data
    );

    return unwrap(response);
};

export const deleteReview = async(id)=>{
    const response =
    await API.delete(
        `/reviews/${id}`
    );

    return unwrap(response);
};
