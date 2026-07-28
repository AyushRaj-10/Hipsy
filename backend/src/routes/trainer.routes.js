import { Router } from "express";


import auth from "../middleware/auth.js";


import {
validate
}
from "../middleware/validation.js";


import {
trainerSchema
}
from "../validators/trainer.validator.js";


import * as controller
from "../controllers/trainer.controller.js";



const router = Router();



router.post(
"/profile",
auth,
validate(trainerSchema),
controller.createProfile
);



router.get(
"/profile",
auth,
controller.getProfile
);



router.put(
"/profile",
auth,
validate(trainerSchema),
controller.updateProfile
);



router.get(
"/",
controller.getAll
);



router.get(
"/:id",
controller.getOne
);



export default router;