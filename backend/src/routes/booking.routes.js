import { Router } from "express";


import auth from "../middleware/auth.js";


import {
validate
}
from "../middleware/validation.js";


import {
bookingSchema,
bookingStatusSchema
}
from "../validators/booking.validator.js";


import * as controller
from "../controllers/booking.controller.js";



const router = Router();



router.post(
"/",
auth,
validate(bookingSchema),
controller.create
);



router.get(
"/my",
auth,
controller.myBookings
);



router.patch(
"/:id/status",
auth,
validate(bookingStatusSchema),
controller.updateStatus
);



router.delete(
"/:id",
auth,
controller.cancel
);



export default router;