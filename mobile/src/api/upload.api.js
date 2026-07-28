import API from "./axios";


export const uploadProfileImage = async(image)=>{


const formData = new FormData();


formData.append(
    "image",
    {
        uri:image.uri,
        name:"profile.jpg",
        type:"image/jpeg"
    }
);



const response =
await API.post(

"/upload/profile",

formData,

{

headers:{

"Content-Type":
"multipart/form-data"

}

}

);


return response.data;


};