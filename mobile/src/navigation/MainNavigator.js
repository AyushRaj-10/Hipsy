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

import ProfileScreen
from "../screens/Profile/ProfileScreen";


import EditProfileScreen
from "../screens/Profile/EditProfileScreen";



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

name="Profile"

component={ProfileScreen}

/>


<Stack.Screen

name="EditProfile"

component={EditProfileScreen}

/>


</Stack.Navigator>

);

}