import React from "react";


import {
View,
Text,
TouchableOpacity,
StyleSheet
}
from "react-native";



export default function NotificationCard({
notification,
onPress
}){


return (

<TouchableOpacity

style={

[
styles.card,

notification.isRead
?
styles.read
:
styles.unread

]

}

onPress={onPress}

>


<Text style={styles.title}>

{
notification.title
}

</Text>



<Text>

{
notification.message
}

</Text>



<Text>

{
new Date(
notification.createdAt
)
.toDateString()

}

</Text>


</TouchableOpacity>

);

}



const styles = StyleSheet.create({

card:{

padding:15,

margin:10,

borderRadius:10

},


unread:{

backgroundColor:"#e8f5e9"

},


read:{

backgroundColor:"#ffffff"

},


title:{

fontSize:16,

fontWeight:"bold"

}


});