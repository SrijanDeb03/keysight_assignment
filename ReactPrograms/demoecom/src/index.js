
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MyErrorBoundary from './errorboundary';
import Form from './form';
import UncontrolledFrom from "./uncontrolledform"
 


//ReactDOM.render(<App/>, document.getElementById("root"));


/*function ListItem(props) {
  const item = props.item; // array type
  return (
    <li>{item}</li>
  );
}
 
function NameList(props) {
  const myLists = props.myLists; // array type
 
  const listItems = myLists.map((str) => {
    return <ListItem key={str} item={str} />;   // returning
  });
 
  return (
    <div>
      <h2>Below is the list of names:</h2>
      <ol>{listItems}</ol>
    </div>
  );
}
 
const myLists = ["Ravi", "viran", "Rajeev", "Arun", "Kavita"];
 
ReactDOM.render(<NameList myLists={myLists} />,document.getElementById("root"));*/


/*function ListItem(props) {
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
 
const myLists = ["Ravi","Vinay","Rajeev","Arun","Kavita"]*/

/*function Books(props) {
  const books = props.books;
 
  const left = (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  );
 
  const right = books.map((book) => (
    <div key={book.id}>
      <h2>{book.title}</h2>
      <p>{book.content}</p>
    </div>
  ));
 
  return (
    <div>
      <div>{left}</div>
      <br />
      <div>{right}</div>
    </div>
  );
}
 
const books = [
  {
    id: 1,
    title: "ABC",
    content: "fiction book"
  },
  {
    id: 2,
    title: "XYZ",
    content: "mystery book"
  }
];
 
ReactDOM.render(
  <Books books={books} />,
  document.getElementById("root")
);*/

//ReactDOM.render(<MyErrorBoundary><App /></MyErrorBoundary>,document.getElementById('root'));
ReactDOM.render(<UncontrolledFrom><App /></UncontrolledFrom>,document.getElementById('root'));