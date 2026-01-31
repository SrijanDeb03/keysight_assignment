import React from "react";
import ControlledForm from "./ControlledForm";
import UncontrolledForm from "./UncontrolledForm";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Forms Assignment</h1>

      <ControlledForm />

      <hr />

      <UncontrolledForm />
    </div>
  );
}

export default App;
