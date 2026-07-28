import React,{
useState
}
from "react";


import {

View,
TextInput,
Button

}
from "react-native";


import {
updateProfile
}
from "../../api/user.api";


import {
uploadProfileImage
}
from "../../api/upload.api";


import * as ImagePicker
from "expo-image-picker";



export default function EditProfileScreen({
route,
navigation
}){


const {
user
}
=
route.params;



const [name,setName]=useState(
user.name
);


const [phone,setPhone]=useState(
user.phone || ""
);


const [
image,
setImage
]
=
useState(null);



const pickImage=async()=>{


const result =
await ImagePicker.launchImageLibraryAsync({

mediaTypes:
["images"],

quality:0.7

});



if(!result.canceled){

setImage(
result.assets[0]
);

}


};



const save=async()=>{


let imageUrl =
user.profileImage;



if(image){


const upload =
await uploadProfileImage(
image
);


imageUrl =
upload.data.profileImage;


}



await updateProfile({

name,

phone,

profileImage:imageUrl

});



alert(
"Profile Updated"
);



navigation.goBack();


};



return (

<View>


<Button

title="Choose Image"

onPress={pickImage}

/>



<TextInput

value={name}

onChangeText={setName}

placeholder="Name"

/>



<TextInput

value={phone}

onChangeText={setPhone}

placeholder="Phone"

/>



<Button

title="Save"

onPress={save}

/>



</View>

);

}