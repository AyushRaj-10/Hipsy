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

title="View Reviews"

onPress={()=>


navigation.navigate(

"ReviewList",

{
trainerId:id
}

)


}

/>

<Button

title="Give Review"

onPress={()=>


navigation.navigate(

"AddReview",

{
trainerId:id
}

)


}

/>

<Button

title="Notifications"

onPress={()=>


navigation.navigate(
"Notifications"
)


}

/>

</View>

);

}