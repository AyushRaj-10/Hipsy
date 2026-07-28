import React,{
useState
}
from "react";


import {

View,
TextInput,
Button,
Text

}
from "react-native";


import {
addReview
}
from "../../api/review.api";


import StarRating
from "../../components/review/StarRating";



export default function AddReviewScreen({
route,
navigation
}){


const {
trainerId
}
=
route.params;



const [rating,setRating]=useState(0);


const [comment,setComment]=useState("");



const submit=async()=>{


try{


await addReview({

trainerId,

rating,

comment

});



alert(
"Review Added"
);



navigation.goBack();


}
catch(error){

console.log(error);

}


};



return (

<View>


<Text>

Give Rating

</Text>



<StarRating

rating={rating}

setRating={setRating}

/>



<TextInput

placeholder="Write your review"

multiline

value={comment}

onChangeText={setComment}

style={{

height:100

}}

/>



<Button

title="Submit Review"

onPress={submit}

/>



</View>

);

}