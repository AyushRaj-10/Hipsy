import { z } from "zod";


export const updateProfileSchema = z.object({

    name:z.string()
        .min(3)
        .optional(),


    phone:z.string()
        .optional(),


    age:z.number()
        .optional(),


    gender:z.enum([
        "MALE",
        "FEMALE",
        "OTHER"
    ])
    .optional(),


    fitnessGoal:z.enum([
        "WEIGHT_LOSS",
        "MUSCLE_GAIN",
        "GENERAL_FITNESS",
        "ENDURANCE"
    ])
    .optional()

});