import React from "react";


import {

View,
Image,
TouchableOpacity,
StyleSheet

}
from "react-native";



export default function ProfileAvatar({
image,
onPress
}){


return (

<TouchableOpacity
onPress={onPress}
>

<Image

source={{

uri:
image ||

"https://via.placeholder.com/150"

}}

style={styles.image}

/>


</TouchableOpacity>

);

}



const styles = StyleSheet.create({

image:{

width:120,

height:120,

borderRadius:60

}

});