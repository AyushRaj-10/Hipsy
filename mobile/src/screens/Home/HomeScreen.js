import React from "react";


import {
View,
Button,
Text
}
from "react-native";



export default function HomeScreen({
navigation
}){


return (

<View>


<Text>

Welcome to Hipsy

</Text>



<Button

title="Find Trainers"

onPress={()=>


navigation.navigate(
"TrainerList"
)


}

/>

<Button

title="My Bookings"

onPress={()=>

navigation.navigate(
"MyBookings"
)

}

/>



</View>

);

}