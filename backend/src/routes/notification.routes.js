import {Router} from "express";


import auth from "../middleware/auth.js";


import * as controller
from "../controllers/notification.controller.js";



const router = Router();



router.get(
"/",
auth,
controller.getAll
);



router.patch(
"/:id/read",
auth,
controller.read
);



router.delete(
"/:id",
auth,
controller.remove
);



export default router;