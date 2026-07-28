import React,{
useContext
}
from "react";


import AuthNavigator
from "./AuthNavigator";


import MainNavigator
from "./MainNavigator";


import {
AuthContext
}
from "../context/AuthContext";



export default function RootNavigator(){


const {
token
}
=
useContext(AuthContext);



return token ?

<MainNavigator/>

:

<AuthNavigator/>;


}