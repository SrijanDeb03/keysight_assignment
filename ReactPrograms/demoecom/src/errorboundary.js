import React from 'react';
 
class MyErrorBoundary extends React.Component {
 
  state = {
    errorMessage: ""
  };
 
  static getDerivedStateFromError(error) {
    return {
      errorMessage: error.toString()
    };
  }
 
  componentDidCatch(error, info) {
    this.logErrorToServices(error.toString(), info.componentStack);
  }
 
  logErrorToServices = console.log;
 
  render() {
    if (this.state.errorMessage) {
      return <p>{this.state.errorMessage}</p>;
    }
 
    return this.props.children;
  }
}
 
class BuggyCounter extends React.Component {
 
  state = {
    counter: 0
  };
 
  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };
 
  render() {
    if (this.state.counter === 5) {
      throw new Error("You cannot increment more than 5");
    }
 
    return (
      <div>
        <h2>{this.state.counter}</h2>
        <button onClick={this.handleClick}>Add</button>
      </div>
    );
  }
}
 
function App() {
  return (
    <div>
      <MyErrorBoundary>
        <BuggyCounter />
      </MyErrorBoundary>
    </div>
  );
}
/*class NotBuggy extends React.Component{
    constructor(props)
    {
    super(props)
 
    this.state = {
        greeting : "Welcome"
    }
    }
    componentDidMount(){}
 
    render(){
        return(
            <div>
                <h2> {this.state.greeting}</h2>
            </div>
        )
    }
}*/
 
export default App;
 