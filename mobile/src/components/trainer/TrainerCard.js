import React from "react";


import {
View,
Text,
Image,
TouchableOpacity,
StyleSheet
}
from "react-native";



export default function TrainerCard({
trainer,
onPress
}){


return (

<TouchableOpacity

style={styles.card}

onPress={onPress}

>


<Image

source={{

uri:
trainer.userId?.profileImage ||

"https://via.placeholder.com/100"

}}

style={styles.image}

/>



<View>

<Text style={styles.name}>

{
trainer.userId?.name
}

</Text>



<Text>

{
trainer.specialization
}

</Text>



<Text>

Experience:

{
trainer.experience
}
years

</Text>



<Text>

⭐
{
trainer.rating
}

</Text>


</View>


</TouchableOpacity>

);

}



const styles = StyleSheet.create({

card:{


flexDirection:"row",

padding:15,

margin:10,

backgroundColor:"#fff",

borderRadius:12,

elevation:3

},


image:{


width:80,

height:80,

borderRadius:40,

marginRight:15

},


name:{

fontSize:18,

fontWeight:"bold"

}

});