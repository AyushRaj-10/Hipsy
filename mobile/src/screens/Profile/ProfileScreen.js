import React,{
useEffect,
useState,
useContext
}
from "react";


import {

View,
Text,
Button

}
from "react-native";


import {
getProfile
}
from "../../api/user.api";


import {
AuthContext
}
from "../../context/AuthContext";


import ProfileAvatar
from "../../components/profile/ProfileAvatar";



export default function ProfileScreen({
navigation
}){


const [user,setUser]=useState(null);


const {
logout
}
=
useContext(AuthContext);



useEffect(()=>{

loadProfile();

},[]);



const loadProfile=async()=>{


const response =
await getProfile();



setUser(
response.data
);


};



if(!user)
return null;



return (

<View>


<ProfileAvatar

image={
user.profileImage
}

/>



<Text>

{
user.name
}

</Text>



<Text>

{
user.email
}

</Text>



<Text>

{
user.phone
}

</Text>



<Button

title="Edit Profile"

onPress={()=>

navigation.navigate(
"EditProfile",
{
user
}
)

}

/>



<Button

title="Logout"

onPress={logout}

/>


</View>

);

}