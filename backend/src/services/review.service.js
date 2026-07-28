import {

createReview,
getTrainerReviews,
findReviewById,
updateReview,
deleteReview

}
from "../repositories/review.repository.js";


import Trainer from "../models/Trainer.js";



export const addReview = async(
userId,
data
)=>{


const review =
await createReview({

    userId,

    ...data

});



// update trainer rating

const reviews =
await getTrainerReviews(
    data.trainerId
);



const total =
reviews.reduce(
(sum,item)=>sum + item.rating,
0
);



const average =
total / reviews.length;



await Trainer.findByIdAndUpdate(
data.trainerId,
{
    rating:Number(
        average.toFixed(1)
    ),
    totalReviews:
        reviews.length
}
);



return review;

};





export const getReviews = async(
trainerId
)=>{


return getTrainerReviews(
    trainerId
);


};





export const editReview = async(
id,
data
)=>{


return updateReview(
id,
data
);


};





export const removeReview = async(
id
)=>{


return deleteReview(id);

};