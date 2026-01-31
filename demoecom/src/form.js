import React from 'react'
 
class Form extends React.Component{
 
    constructor(){
        super();
        this.state = {
            roll_no : null,
            participate : ''
        }
    }
 
    changeHandler = (event, a) =>{
        let nam = event.target.name;
        let val = event.target.value;
 
        if(nam === "roll_no")
        {
            if(!Number(val)){
                alert("your roll_no should be a number");
            }
            this.setState({[nam] : val})
        }
    }
 
    render(){
        return(
            <form>
                <h2> Hello !! {this.state.participate} </h2>
                <p> Register your name: </p>
                <input type="text" name="participate" onChange={this.changeHandler} />
 
                 <p> Register your roll No: </p>
                <input type="text" name="roll_no" onChange={this.changeHandler} />
                <h2> Your roll no will {this.state.roll_no}</h2>
            </form>
        )
    }
}
 
export default Form;