import {Router} from "express";


import auth from "../middleware/auth.js";


import upload from "../middleware/upload.js";


import {
uploadProfileImage
}
from "../controllers/upload.controller.js";



const router = Router();



router.post(

"/profile",

auth,

upload.single("image"),

uploadProfileImage

);



export default router;