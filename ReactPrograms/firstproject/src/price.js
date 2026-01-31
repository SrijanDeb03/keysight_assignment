
import React from 'react';

class PriceComp extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            price : 3500,
            discount : 10
        }
    }

    changePrice(){
        this.setState({price:5000, discount :20})
    }
    render(){
        setTimeout(() =>{
            this.setState({price:4000, discount :20})
        },5000);


        return(
            <div>
                <p> The price of the component is {this.state.price} </p>
                <p> The discount offered is {this.state.discount} </p>
                <button onClick={() => this.changePrice()}> Update Price</button>
            </div>
        )
    }
}
export default PriceComp; //exporting the component