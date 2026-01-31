import React from "react";

function StudentList() {

  // List of student objects
  const students = [
    { studid: 1, studname: "Srijan", age: 22, city: "Kolkata" },
    { studid: 2, studname: "Riya", age: 22, city: "Mumbai" },
    { studid: 3, studname: "Karan", age: 21, city: "Pune" },
    { studid: 4, studname: "Neha", age: 23, city: "Bangalore" }
  ];

  return (
    <div>
      {students.map((student) => (
        <div key={student.studid}>
          <h2>{student.studname}</h2>
          <h3>{student.age}</h3>
          <p>{student.city}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default StudentList;
