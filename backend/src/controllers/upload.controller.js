import {
uploadImage
}
from "../services/upload.service.js";


import User from "../models/User.js";


import {
success
}
from "../utils/response.js";



export const uploadProfileImage = async(
req,
res,
next
)=>{


try{


const result =
await uploadImage(
req.file
);



const user =
await User.findByIdAndUpdate(

req.user.id,

{

profileImage:
result.secure_url

},

{
new:true
}

)
.select("-password");



return success(
res,
"Profile image uploaded",
user
);


}
catch(err){

next(err);

}

};