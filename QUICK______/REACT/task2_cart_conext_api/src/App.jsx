import { useState } from "react";
import { CountContext,UserContext } from "./CreationContext";
import { DisplayCounter } from "./DisplayCounter";
import { ControlCounter } from "./ControlCounter";
import { DisplayUser } from "./DisplayUser";
import { ControlUser } from "./ControlUser";

export default function App(){

  const [Count,setCount]=useState(0);
  const [UserData,setUser]=useState([{name:"krish",age:"24",no:"9347796811",roll:"Full Stack"}]);
  return(
    <CountContext.Provider value={{Count,setCount}} >
    <UserContext.Provider value={{UserData,setUser}}>
<div style={{background:"black",color:"white"}}>
      <div>-----------Counter Control</div>


      <DisplayCounter/>
      <ControlCounter/>
      <div>-----------User Control</div>
      <DisplayUser/>
      <ControlUser/>
      </div>

   </UserContext.Provider>   
   </CountContext.Provider>   
   


  )
}