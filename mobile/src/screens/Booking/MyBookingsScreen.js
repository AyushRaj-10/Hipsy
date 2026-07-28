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
getMyBookings
}
from "../../api/booking.api";


import BookingCard
from "../../components/booking/BookingCard";



export default function MyBookingsScreen(){


const [
bookings,
setBookings
]
=
useState([]);



useEffect(()=>{

loadBookings();

},[]);



const loadBookings=async()=>{


const response =
await getMyBookings();



setBookings(
response.data
);


};



return (

<View>


<FlatList


data={bookings}


keyExtractor={
item=>item._id
}


renderItem={({item})=>(


<BookingCard

booking={item}

/>


)}


/>


</View>

);


}