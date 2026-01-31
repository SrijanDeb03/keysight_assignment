import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Shoppingcomp from './shopping';
import PriceComp from './price';
import Music from './lifecycle';
import ComponentWillunmount from './lifecycle';
import App from "./contextdemo";
// import App from './App';
// import reportWebVitals from './reportWebVitals';
 
/*class LoginComponent extends React.Component{
  render(){
    return(
      <div>
        <Header/>
        <br></br>
        <h2>Login Page</h2>
        <p>This is my login page</p>
        <form>
          <label>User name:</label>
          <input type= "text" name="username"/> <br></br>
          <label>Password:</label>
          <input type= "password" name="password"/> <br></br>
          <input type="submit" value="Login"/>
          <label></label>
        </form>
        <br></br>
        <Footer/>
      </div>
    )
  }
} 
class Header extends React.Component{
  render(){
    return(
      <div>
        <h1>Welcome to Keysight</h1>
      </div>
    )
  }
}

class Footer extends React.Component{
  render(){
    return(
      <p>Copyright ABC  </p>
    )
  }
}*/
 


/*function LoginComponent1(){
  
    return(
      <div>
        <Header1/>
        <br></br>
        <h2>Login Page</h2>
        <p>This is my login page</p>
        <form>
          <label>User name:</label>
          <input type= "text" name="username"/> <br></br>
          <label>Password:</label>
          <input type= "password" name="password"/> <br></br>
          <input type="submit" value="Login"/>
          <label></label>
        </form>
        <br></br>
        <Footer1/>
      </div>
    )
  
} 
*/

function Header1(){
  
    return(
      <div>
        <h1>Welcome to Keysight</h1>
      </div>
    )
  
}

function Footer1 (){
  
    return(
      <p>Copyright ABC  </p>
    )
  
}

//ReactDOM.render(<Shoppingcomp/>, document.getElementById('root'));

//ReactDOM.render(<PriceComp/>, document.getElementById('root'));

//ReactDOM.render(<Music/>, document.getElementById('root'));


//ReactDOM.render(<ComponentWillunmount/>, document.getElementById('root'));

ReactDOM.render(<App/>, document.getElementById('root'));