import React,{
useEffect,
useState
}
from "react";


import {

View,

FlatList,

Text

}
from "react-native";


import {
getTrainers
}
from "../../api/trainer.api";


import TrainerCard
from "../../components/trainer/TrainerCard";



export default function TrainerListScreen({
navigation
}){


const [trainers,setTrainers]=useState([]);



useEffect(()=>{


loadTrainers();


},[]);



const loadTrainers=async()=>{


try{


const response =
await getTrainers();



setTrainers(
response.data
);


}
catch(error){

console.log(error);

}

};



return (

<View>


<FlatList


data={trainers}


keyExtractor={(item)=>item._id}


renderItem={({item})=>(


<TrainerCard


trainer={item}


onPress={()=>


navigation.navigate(

"TrainerDetails",

{

id:item._id

}

)


}


/>


)}


/>


</View>

);

}