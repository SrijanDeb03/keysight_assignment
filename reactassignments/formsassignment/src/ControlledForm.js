import React, { useState } from "react";

function ControlledForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    gender: "",
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.course) newErrors.course = "Course is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);

      // Clear form
      setFormData({
        name: "",
        email: "",
        age: "",
        course: "",
        gender: "",
        terms: false
      });
    }
  };

  return (
    <div>
      <h2>Controlled Form – Student Admission</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
        />
        <p>{errors.name}</p>

        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleChange}
        />
        <p>{errors.email}</p>

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <p>{errors.age}</p>

        <select name="course" value={formData.course} onChange={handleChange}>
          <option value="">Select Course</option>
          <option>React</option>
          <option>Angular</option>
          <option>Java</option>
          <option>Python</option>
        </select>
        <p>{errors.course}</p>

        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
        <p>{errors.gender}</p>

        <label>
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          Accept Terms & Conditions
        </label>

        <br /><br />

        <button type="submit" disabled={!formData.terms}>
          Submit
        </button>
      </form>

      {submittedData && (
        <div style={{ border: "1px solid black", marginTop: "15px", padding: "10px" }}>
          <h3>Submitted Data</h3>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Age: {submittedData.age}</p>
          <p>Course: {submittedData.course}</p>
          <p>Gender: {submittedData.gender}</p>
        </div>
      )}
    </div>
  );
}

export default ControlledForm;
