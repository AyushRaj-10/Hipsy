import React from "react";


import {
View,
TouchableOpacity,
Text
}
from "react-native";



export default function StarRating({
rating,
setRating
}){


return (

<View

style={{
flexDirection:"row"
}}

>


{
[1,2,3,4,5].map((item)=>(


<TouchableOpacity

key={item}

onPress={()=>setRating(item)}

>


<Text

style={{

fontSize:35

}}

>

{
item <= rating
?
"⭐"
:
"☆"
}

</Text>


</TouchableOpacity>


))

}


</View>

);

}