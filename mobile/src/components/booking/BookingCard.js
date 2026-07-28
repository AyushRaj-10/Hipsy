import React from "react";


import {

View,
Text,
StyleSheet

}
from "react-native";



export default function BookingCard({
booking
}){


return (

<View style={styles.card}>


<Text>

Trainer:

{
booking.trainerId?.userId?.name
}

</Text>



<Text>

Date:

{
new Date(
booking.date
)
.toDateString()

}

</Text>



<Text>

Time:

{
booking.time
}

</Text>



<Text>

Status:

{
booking.status
}

</Text>



</View>

);


}



const styles=StyleSheet.create({

card:{


padding:15,

margin:10,

backgroundColor:"#fff",

borderRadius:10,

elevation:3


}


});