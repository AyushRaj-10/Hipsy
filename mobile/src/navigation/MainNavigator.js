import {
createNativeStackNavigator
}
from "@react-navigation/native-stack";


import HomeScreen
from "../screens/Home/HomeScreen";


import TrainerListScreen
from "../screens/Trainer/TrainerListScreen";


import TrainerDetailsScreen
from "../screens/Trainer/TrainerDetailsScreen";

import CreateBookingScreen
from "../screens/Booking/CreateBookingScreen";


import MyBookingsScreen
from "../screens/Booking/MyBookingsScreen";



const Stack =
createNativeStackNavigator();



export default function MainNavigator(){


return (

<Stack.Navigator>


<Stack.Screen

name="Home"

component={HomeScreen}

/>


<Stack.Screen

name="TrainerList"

component={TrainerListScreen}

/>



<Stack.Screen

name="TrainerDetails"

component={TrainerDetailsScreen}

/>


<Stack.Screen

name="CreateBooking"

component={CreateBookingScreen}

/>


<Stack.Screen

name="MyBookings"

component={MyBookingsScreen}

/>


</Stack.Navigator>

);

}