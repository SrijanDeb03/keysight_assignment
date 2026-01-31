import React, { useState, useEffect } from "react";

function Marksheet() {
  const [name] = useState("Srijan");
  const [age] = useState(22);

  const [maths, setMaths] = useState(50);
  const [chemistry, setChemistry] = useState(60);
  const [physics, setPhysics] = useState(70);

  const [total, setTotal] = useState(0);


  useEffect(() => {
    setTotal(maths + chemistry + physics);
  }, [maths, chemistry, physics]);

  const updateMarks = () => {
    setMaths(maths + 10);
    setChemistry(chemistry + 10);
    setPhysics(physics + 10);
  };

  return (
    <div style={{ border: "2px solid black", padding: "20px", width: "300px" }}>
      <h3>Marksheet</h3>

      <p>Name: {name}</p>
      <p>Age: {age}</p>

      <p>Total: {total}</p>

      <p>Maths: {maths}</p>
      <p>Chemistry: {chemistry}</p>
      <p>Physics: {physics}</p>

      <button onClick={updateMarks}>Update</button>
    </div>
  );
}

export default Marksheet;
