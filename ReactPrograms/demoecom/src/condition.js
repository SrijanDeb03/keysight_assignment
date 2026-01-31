import React from "react";

function LoginStatus(){
 
    const[isLoggedIn, setIsLoggedIn] = useState(false);
 
    return(
        <>
        <h2> User Authetication </h2>
        {
            isLoggedIn ? (
             <>
                <p> Welcome, User !! </p>
                <button onClick={ () => setIsLoggedIn(false)} > Logout </button>
             </>
            ) : (
             <>
                <p> Please login to enter the dashboard</p>
                <button onClick={ () => setIsLoggedIn(true)} > Login </button>
             </>
            )
        }
        </>
    )
}
 