import cloudinary from "../config/cloudinary.js";


export const uploadImage = async(file)=>{


return new Promise(
(resolve,reject)=>{


cloudinary.uploader.upload_stream(

{

folder:"hipsy"

},

(error,result)=>{


if(error){

reject(error);

}


else{

resolve(result);

}


}

).end(file.buffer);


});


};