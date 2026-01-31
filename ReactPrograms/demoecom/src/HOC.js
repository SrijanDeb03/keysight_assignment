import React from 'react';
 
const Hello = ({name}) => <h1> Welcome {name} ! </h1>   // function compoenent
 
function simpleHOC(WrappedComponent) {   // returns a new component
 
    return class extends React.Component{   // anonymous class componenet
       render(){
         return <WrappedComponent {...this.props} />;
       }
    }
}
 
let NewComponent = simpleHOC(Hello);
 
const App = () =>
    <div>
        <NewComponent name="Viren" />
    </div>
 
    export default App;
 