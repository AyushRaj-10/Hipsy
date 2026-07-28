import { Router } from "express";


import auth from "../middleware/auth.js";


import {
validate
}
from "../middleware/validation.js";


import {
reviewSchema
}
from "../validators/review.validator.js";


import * as controller
from "../controllers/review.controller.js";


const router = Router();



router.post(
"/",
auth,
validate(reviewSchema),
controller.create
);



router.get(
"/trainer/:trainerId",
controller.getTrainerReviews
);



router.put(
"/:id",
auth,
controller.update
);



router.delete(
"/:id",
auth,
controller.remove
);



export default router;