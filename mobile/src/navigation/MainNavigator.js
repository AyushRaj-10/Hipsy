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

import AddReviewScreen
from "../screens/Review/AddReviewScreen";


import ReviewListScreen
from "../screens/Review/ReviewListScreen";

import NotificationScreen
from "../screens/Notification/NotificationScreen";

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

name="AddReview"

component={AddReviewScreen}

/>


<Stack.Screen

name="ReviewList"

component={ReviewListScreen}

/>

<Stack.Screen

name="Notifications"

component={NotificationScreen}

/>


</Stack.Navigator>

);

}