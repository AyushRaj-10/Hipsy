import * as reviewService
from "../services/review.service.js";


import {
success
}
from "../utils/response.js";



export const create = async(
req,res,next
)=>{

try{


const review =
await reviewService.addReview(
req.user.id,
req.body
);


return success(
res,
"Review added",
review,
201
);


}
catch(err){

next(err);

}

};





export const getTrainerReviews = async(
req,res,next
)=>{

try{


const reviews =
await reviewService.getReviews(
req.params.trainerId
);



return success(
res,
"Reviews fetched",
reviews
);


}
catch(err){

next(err);

}

};





export const update = async(
req,res,next
)=>{

try{


const review =
await reviewService.editReview(
req.params.id,
req.body
);



return success(
res,
"Review updated",
review
);


}
catch(err){

next(err);

}

};





export const remove = async(
req,res,next
)=>{

try{


await reviewService.removeReview(
req.params.id
);



return success(
res,
"Review deleted"
);


}
catch(err){

next(err);

}

};