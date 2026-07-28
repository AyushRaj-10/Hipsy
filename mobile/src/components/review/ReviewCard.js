import React from "react";


import {
View,
Text,
StyleSheet
}
from "react-native";



export default function ReviewCard({
review
}){


return (

<View style={styles.card}>


<Text>

{
review.userId?.name
}

</Text>



<Text>

{
"⭐".repeat(review.rating)
}

</Text>



<Text>

{
review.comment
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

elevation:2

}

});