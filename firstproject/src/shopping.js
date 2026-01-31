
import React from 'react';  
 
/*class ShoppingComp extends React.Component {
    render()
    {
        return(
           <div>
                <h2> Shopping Component </h2>
                <Product wname="Magna 10x Watch" wprice="3500" wbrand="Titan" mname="LG 1034 Microwave" mprice="4500" />  
           </div>
        )
    }
}
 
class Product extends React.Component{
    render(){
        return(
            <div>
                <h2> List of Products</h2>    
                <Watch name={this.props.wname} price={this.props.wprice} brand={this.props.wbrand} />
                <Microwave name={this.props.mname} price={this.props.mprice} />
            </div>
        )
    }
}
 
class Watch extends React.Component{
    render(){
        return(
            <div>
                <h3> Watch Details below</h3>
                <p> Product name is {this.props.name}</p>  
                <p> Product price is {this.props.price}</p>
                <p> Product brand is {this.props.brand}</p>
            </div>
        )
    }
}
 
class Microwave extends React.Component{
    render(){
        return(
            <div>
                <h3> Microwave Details below</h3>
                <p> Product name is {this.props.name}</p>  
                <p> Product price is {this.props.price}</p>
            </div>
        )
    }
}*/




function ShoppingComp() {
    
    
        return(
           <div>
                <h2> Shopping Component </h2>
                <Product wname="Magna 10x Watch" wprice="3500" wbrand="Titan" mname="LG 1034 Microwave" mprice="4500" />  
           </div>
        )
    
}

function Product(props) {
    
        return(
            <div>
                <h2> List of Products</h2>    
                <Watch name={props.wname} price={props.wprice} brand={props.wbrand} />
                <Microwave name={props.mname} price={props.mprice} />
            </div>
        )
    
}

function Watch(props){
    {
        return(
            <div>
                <h3> Watch Details below</h3>
                <p> Product name is {props.name}</p>  
                <p> Product price is {props.price}</p>
                <p> Product brand is {props.brand}</p>
            </div>
        )
    }
}


function Microwave(props){
    {
        return(
            <div>
                <h3> Microwave Details below</h3>
                <p> Product name is {props.name}</p>  
                <p> Product price is {props.price}</p>
            </div>
        )
    }
}
export default ShoppingComp;