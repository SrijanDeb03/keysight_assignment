

import React from "react";

/*class Music extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            instrument : "Guitar"
        }
    }
    
    static getDerivedStateFromProps(props,state){
        return {instrument : props.New}
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({instrument: "Piano"})
        },3000)
    }

    shouldComponentUpdate(){ //component enabled/disabled to update
            return true; //if false doesn't change the instrment, if true it changes
    }
    change=()=>{
        this.setState({instrument: "Piano"})
    }

    getSnapshotBeforeUpdate(prevProps, prevState){ //display the previous state or previous props
        document.getElementById("c1").innerHTML = "Previous instrument is " + prevState.instrument;
    }

    componentDidUpdate(){
        document.getElementById("c2").innerHTML = "The updated instrument is " + this.state.instrument;
    }
    render(){
        return(
            <div>
                <h2>I know how to play {this.state.instrument}</h2>
                <p id="c1"></p>
                <p id="c2"></p>
                <button type="button" onClick={this.change}>Change Instrument</button>
            </div>
        )
    }
}*/


//UNMOUNT

class ComponentWillunmount  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show : true
        }
    }
    render(){
        return(
            <div>
                <p> {this.state.show ? <Child/> : null}</p>
                <button onClick={ ()=>{
                    this.setState({show: !this.state.show})
                }}>
                    Toggle
                </button>
            </div>
        )
    }
}

class  Child extends React.Component{
    componentWillUnmount(){
        alert ("This will get unmounted");
    }
    render(){
        return(
            <h2> I am child component</h2>
        )
    }
}



export default ComponentWillunmount;