import React, { useRef } from "react";

function UncontrolledForm() {
  const nameRef = useRef();
  const courseRef = useRef();
  const feedbackRef = useRef();
  const ratingRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Student Name: ${nameRef.current.value}
Course Name: ${courseRef.current.value}
Feedback: ${feedbackRef.current.value}
Rating: ${ratingRef.current.value}`
    );

    e.target.reset(); // reset form
  };

  return (
    <div>
      <h2>Uncontrolled Form – Course Feedback</h2>

      <form onSubmit={handleSubmit}>
        <input ref={nameRef} placeholder="Student Name" />
        <br />

        <input ref={courseRef} placeholder="Course Name" />
        <br />

        <textarea ref={feedbackRef} placeholder="Feedback Message" />
        <br />

        <input
          ref={ratingRef}
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
        />
        <br /><br />

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default UncontrolledForm;
