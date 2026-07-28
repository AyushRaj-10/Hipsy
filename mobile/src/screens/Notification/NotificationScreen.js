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

getNotifications,

markNotificationRead

}
from "../../api/notification.api";


import NotificationCard
from "../../components/notification/NotificationCard";



export default function NotificationScreen(){


const [
notifications,
setNotifications
]
=
useState([]);



useEffect(()=>{

loadNotifications();

},[]);



const loadNotifications=async()=>{


try{


const response =
await getNotifications();



setNotifications(
response.data
);


}
catch(error){

console.log(error);

}


};



const openNotification=async(id)=>{


await markNotificationRead(id);



loadNotifications();


};



return (

<View>


<FlatList


data={notifications}


keyExtractor={
item=>item._id
}


renderItem={({item})=>(


<NotificationCard


notification={item}


onPress={()=>


openNotification(
item._id
)


}


/>


)}


/>


</View>

);

}