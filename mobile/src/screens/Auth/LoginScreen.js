import React,{
useState,
useContext
}
from "react";


import {
View,
TextInput,
Button,
Text
}
from "react-native";


import {
loginUser
}
from "../../api/auth.api";


import {
AuthContext
}
from "../../context/AuthContext";



export default function LoginScreen({navigation}){


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");



const {
login
}
=
useContext(AuthContext);



const submit=async()=>{


try{


const response =
await loginUser({

email,

password

});



login(
response.data
);


}
catch(error){

console.log(
error.message
);

}


};



return (

<View>


<Text>
Login
</Text>


<TextInput

placeholder="Email"

value={email}

onChangeText={setEmail}

/>



<TextInput

placeholder="Password"

secureTextEntry

value={password}

onChangeText={setPassword}

/>



<Button

title="Login"

onPress={submit}

/>



<Button

title="Create Account"

onPress={()=>navigation.navigate("Register")}

/>


</View>

);


}