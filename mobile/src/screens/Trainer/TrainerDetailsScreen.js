import React,{
useEffect,
useState
}
from "react";


import {

View,

Text,

Image,

Button

}
from "react-native";


import {
getTrainerById
}
from "../../api/trainer.api";



export default function TrainerDetailsScreen({
route,
navigation
}){


const {
id
}
=
route.params;



const [trainer,setTrainer]=useState(null);



useEffect(()=>{

loadTrainer();

},[]);



const loadTrainer=async()=>{


const response =
await getTrainerById(id);



setTrainer(
response.data
);


};



if(!trainer)
return null;



return (

<View>


<Image

source={{

uri:
trainer.userId.profileImage

}}

style={{

width:120,

height:120,

borderRadius:60

}}

/>



<Text>

{
trainer.userId.name
}

</Text>



<Text>

{
trainer.specialization
}

</Text>



<Text>

Experience:

{
trainer.experience
}

years

</Text>



<Text>

₹
{
trainer.price
}

per session

</Text>



<Text>

⭐
{
trainer.rating
}

(
{
trainer.totalReviews
}
reviews)

</Text>



<Button

title="Book Trainer"

onPress={()=>


navigation.navigate(

"CreateBooking",

{

trainerId:id

}

)


}

/>


</View>

);


}