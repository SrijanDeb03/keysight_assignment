import React, { useState, useEffect } from "react";
 
function CountApp(){
 
    const[count,setCount] = useState(0);   // usestate hook
    const[name,setName] = useState({FirstName:"Viren", surname :"Sharma"})
    const[title] = useState("Trainer")
 
    useEffect( () =>{
      const timer = setTimeout ( ()=>{
        setName({FirstName:"Ravi", surname :"Verma"})
      }, 4000)
      return () => {clearTimeout(timer)}
    },[]);
 
    return(
        <div>
            I clicked the button {count} times
            <button onClick = { () => setCount(count + 1)}> Add </button>
            <h3> Title : {title} </h3>
            <h3> FirstNmae : {name.FirstName} </h3>
            <h3> Last Name : {name.surname} </h3>
        </div>
    )
}
 
export default CountApp;