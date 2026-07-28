import Review from "../models/Review.js";
import mongoose from "mongoose";


export const createReview = async(data)=>{

    return Review.create(data);

};



export const getTrainerReviews = async(
    trainerId
)=>{

    return Review.find({
        trainerId
    })
    .populate(
        "userId",
        "name profileImage"
    );

};



export const findReviewById = async(id)=>{

    return Review.findById(id);

};



export const updateReview = async(
    id,
    data
)=>{

    return Review.findByIdAndUpdate(
        id,
        data,
        {
            new:true
        }
    );

};



export const deleteReview = async(id)=>{

    return Review.findByIdAndDelete(id);

};



export const getTrainerAverageRating = async(
    trainerId
)=>{


    const result =
    await Review.aggregate([
        {
            $match:{
                trainerId:
                new mongoose.Types.ObjectId(trainerId)
            }
        },
        {
            $group:{
                _id:null,
                average:{
                    $avg:"$rating"
                },
                count:{
                    $sum:1
                }
            }
        }
    ]);


    return result[0];

};