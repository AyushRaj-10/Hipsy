import { z } from "zod";


export const reviewSchema = z.object({

    trainerId:
        z.string(),


    rating:
        z.number()
        .min(1)
        .max(5),


    comment:
        z.string()
        .min(3)

});