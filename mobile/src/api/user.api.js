import API from "./axios";

const unwrap = (response) => response.data?.data ?? response.data;


export const getProfile = async()=>{

    const response =
    await API.get(
        "/users/profile"
    );

    return unwrap(response);

};



export const updateProfile = async(data)=>{

    const response =
    await API.put(
        "/users/profile",
        data
    );

    return unwrap(response);

};

export const deleteAccount = async()=>{
    const response =
    await API.delete(
        "/users/account"
    );

    return unwrap(response);
};
