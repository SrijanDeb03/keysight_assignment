import React, { useState, useEffect } from "react";

function InstrumentChange() {
  const [newInstrument, setNewInstrument] = useState("");

  // useEffect runs whenever newInstrument changes
  useEffect(() => {
    if (newInstrument !== "") {
      console.log("New instrument updated:", newInstrument);
    }
  }, [newInstrument]);

  const showInstrument = () => {
    setNewInstrument("Violin");
  };

  return (
    <div style={{ border: "1px solid black", padding: "20px", width: "300px" }}>
      <p>Old Instrument: Drums</p>
      <p>New Instrument: {newInstrument}</p>

      <button onClick={showInstrument}>Show</button>
    </div>
  );
}

export default InstrumentChange;
