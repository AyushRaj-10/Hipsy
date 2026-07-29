import API from "./axios";

const unwrap = (response) => response.data?.data ?? response.data;



export const createBooking = async(data)=>{

    const response =
    await API.post(
        "/bookings",
        data
    );


    return unwrap(response);

};



export const getMyBookings = async()=>{


    const response =
    await API.get(
        "/bookings/my"
    );


    return unwrap(response);

};



export const cancelBooking = async(id)=>{


    const response =
    await API.delete(
        `/bookings/${id}`
    );


    return unwrap(response);

};

export const updateBookingStatus = async(id, status)=>{
    const response =
    await API.patch(
        `/bookings/${id}/status`,
        { status }
    );

    return unwrap(response);
};
