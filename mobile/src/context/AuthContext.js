import React,{
createContext,
useState
} from "react";


import {
saveToken,
removeToken
}
from "../storage/tokenStorage";



export const AuthContext =
createContext();



export const AuthProvider=({
children
})=>{


const [user,setUser]=useState(null);

const [token,setToken]=useState(null);



const login=(data)=>{


    setUser(
        data.user
    );


    setToken(
        data.token
    );


    saveToken(
        data.token
    );

};



const logout=()=>{


    setUser(null);

    setToken(null);

    removeToken();

};



return (

<AuthContext.Provider

value={{

user,

token,

login,

logout

}}

>

{children}

</AuthContext.Provider>

);


};