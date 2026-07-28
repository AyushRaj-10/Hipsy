import { Router } from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import trainerRoutes from "./trainer.routes.js";
import bookingRoutes from "./booking.routes.js";
import reviewRoutes from "./review.routes.js";
import uploadRoutes from "./upload.routes.js";
import notificationRoutes 
from "./notification.routes.js";

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

router.use(
"/reviews",
reviewRoutes
);

router.use(
"/upload",
uploadRoutes
);

router.use(
"/notifications",
notificationRoutes
);

export default router;