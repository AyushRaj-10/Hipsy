import React,{
useState
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
registerUser
}
from "../../api/auth.api";



export default function RegisterScreen({navigation}){


const [name,setName]=useState("");

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");



const submit=async()=>{


try{


await registerUser({

name,

email,

password

});


navigation.navigate(
"Login"
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
Register
</Text>


<TextInput

placeholder="Name"

onChangeText={setName}

/>



<TextInput

placeholder="Email"

onChangeText={setEmail}

/>



<TextInput

placeholder="Password"

secureTextEntry

onChangeText={setPassword}

/>



<Button

title="Register"

onPress={submit}

/>


</View>

);


}