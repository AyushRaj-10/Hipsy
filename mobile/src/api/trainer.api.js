import API from "./axios";

const unwrap = (response) => response.data?.data ?? response.data;


export const getTrainers = async()=>{

    const response =
    await API.get(
        "/trainers"
    );


    return unwrap(response);

};



export const getTrainerById = async(id)=>{


    const response =
    await API.get(
        `/trainers/${id}`
    );


    return unwrap(response);

};

export const getMyTrainerProfile = async()=>{
    const response =
    await API.get(
        "/trainers/profile"
    );

    return unwrap(response);
};

export const createTrainerProfile = async(data)=>{
    const response =
    await API.post(
        "/trainers/profile",
        data
    );

    return unwrap(response);
};

export const updateTrainerProfile = async(data)=>{
    const response =
    await API.put(
        "/trainers/profile",
        data
    );

    return unwrap(response);
};

export const getTrainerBookings = async(trainerId)=>{
    const response =
    await API.get(
        `/bookings/trainer/${trainerId}`
    );

    return unwrap(response);
};
