import { Router } from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import trainerRoutes from "./trainer.routes.js";
import bookingRoutes from "./booking.routes.js";

const router = Router();


router.use(
    "/auth",
    authRoutes
);


router.use(
    "/users",
    userRoutes
);

router.use(
"/trainers",
trainerRoutes
);

router.use(
"/bookings",
bookingRoutes
);

export default router;