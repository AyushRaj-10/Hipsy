import API from "./axios";

const unwrap = (response) => response.data?.data ?? response.data;


export const uploadProfileImage = async(image)=>{


const formData = new FormData();

const payload =
    image?.uri
        ? {
            uri: image.uri,
            name: image.name || "profile.jpg",
            type: image.type || "image/jpeg"
        }
        : image;


formData.append(
    "image",
    payload
);



const response =
await API.post(

"/upload/profile",

formData,

);


return unwrap(response);


};
