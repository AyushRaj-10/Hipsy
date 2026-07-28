import {
    Router
}
from "express";


import auth from "../middleware/auth.js";


import {
    validate
}
from "../middleware/validation.js";


import {
    updateProfileSchema
}
from "../validators/user.validator.js";


import * as userController
from "../controllers/user.controller.js";



const router = Router();



router.get(
    "/profile",
    auth,
    userController.getProfile
);



router.put(
    "/profile",
    auth,
    validate(updateProfileSchema),
    userController.updateProfile
);



router.delete(
    "/account",
    auth,
    userController.deleteAccount
);



export default router;