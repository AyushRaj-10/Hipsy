import API from "./axios";

const unwrap = (response) => response.data?.data ?? response.data;


export const getNotifications = async()=>{


    const response =
    await API.get(
        "/notifications"
    );


    return unwrap(response);

};



export const markNotificationRead = async(id)=>{


    const response =
    await API.patch(

        `/notifications/${id}/read`

    );


    return unwrap(response);

};



export const deleteNotification = async(id)=>{


    const response =
    await API.delete(

        `/notifications/${id}`

    );


    return unwrap(response);

};
