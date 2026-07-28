import { z } from "zod";


export const trainerSchema = z.object({

    specialization:
        z.string()
        .min(2),


    experience:
        z.number()
        .min(0),


    bio:
        z.string()
        .optional(),


    location:
        z.string()
        .optional(),


    price:
        z.number()
        .min(0)

});