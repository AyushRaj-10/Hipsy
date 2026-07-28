import { z } from "zod";


export const bookingSchema = z.object({

    trainerId:
        z.string(),


    date:
        z.string(),


    time:
        z.string(),


    message:
        z.string()
        .optional()

});



export const bookingStatusSchema = z.object({

    status:z.enum([
        "ACCEPTED",
        "REJECTED"
    ])

});