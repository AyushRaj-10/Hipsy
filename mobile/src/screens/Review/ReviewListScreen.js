import React,{
useEffect,
useState
}
from "react";


import {

View,
FlatList

}
from "react-native";


import {
getTrainerReviews
}
from "../../api/review.api";


import ReviewCard
from "../../components/review/ReviewCard";



export default function ReviewListScreen({
route
}){


const {
trainerId
}
=
route.params;



const [
reviews,
setReviews
]
=
useState([]);



useEffect(()=>{

loadReviews();

},[]);



const loadReviews=async()=>{


const response =
await getTrainerReviews(
trainerId
);



setReviews(
response.data
);


};



return (

<View>


<FlatList


data={reviews}


keyExtractor={
item=>item._id
}


renderItem={({item})=>(


<ReviewCard

review={item}

/>


)}


/>


</View>

);

}