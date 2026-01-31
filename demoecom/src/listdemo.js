import React from "react";

/*function ListItem(props){

    const item = props.item //array type

    return(
        <li>{item}</li>
    )
}

function NameList(props){
    const myLists = props.myLists //array type
    const listItems = myLists.map((str)=>{
        <ListItem key={str} item={str} />  //passing the list items to my ListItem component
    }
)

    return(
        <div>
            <h2> Below is the list of names:</h2>
            <ol> {listitems}</ol>
        </div>
    )
}

const myLists = ["Ravi", "Vinay", "Rajeev", "Arun", "Kavita"]

ReactDom.render(<NameList myLists={myLists}/>, document.getElementById("root"));*/

function ListItem(props) {
  return <li>{props.item}</li>;
}
 
function NameList(props) {
  const listItems = props.myLists.map((name, index) => (
<ListItem key={name + index} item={name} />
  ));
 
  return (
<div>
<h2>Correct Key Usage Example</h2>
<ol>{listItems}</ol>
</div>
  );
}
 
const myLists = ["Ravi","Vinay","Rajeev","Arun","Kavita"]
 
ReactDOM.render(
<NameList myLists={myLists} />,
  document.getElementById("root")
);