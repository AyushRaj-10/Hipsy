import API from "./axios";



export const createBooking = async(data)=>{

    const response =
    await API.post(
        "/bookings",
        data
    );


    return response.data;

};



export const getMyBookings = async()=>{


    const response =
    await API.get(
        "/bookings/my"
    );


    return response.data;

};



export const cancelBooking = async(id)=>{


    const response =
    await API.delete(
        `/bookings/${id}`
    );


    return response.data;

};