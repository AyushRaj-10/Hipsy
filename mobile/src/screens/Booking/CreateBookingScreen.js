import React,{
useState
}
from "react";


import {

View,
Text,
Button

}
from "react-native";


import DateTimePicker
from "@react-native-community/datetimepicker";


import {
createBooking
}
from "../../api/booking.api";



export default function CreateBookingScreen({
route,
navigation
}){


const {
trainerId
}
=
route.params;



const [date,setDate]=useState(
new Date()
);


const [show,setShow]=useState(false);


const [time,setTime]=useState(
"10:00 AM"
);



const submitBooking=async()=>{


try{


await createBooking({

trainerId,

date:

date.toISOString(),

time


});



alert(
"Booking Created"
);



navigation.navigate(
"MyBookings"
);



}
catch(error){

console.log(error);

}



};



return (

<View>


<Text>

Select Date

</Text>



<Button

title={
date.toDateString()
}

onPress={()=>setShow(true)}

/>



{
show &&

<DateTimePicker

value={date}

mode="date"

onChange={(event,selected)=>{

setShow(false);

if(selected)
setDate(selected);

}}


/>

}



<Text>

Selected Time:

{
time
}

</Text>



<Button

title="Book Now"

onPress={submitBooking}

/>


</View>

);

}