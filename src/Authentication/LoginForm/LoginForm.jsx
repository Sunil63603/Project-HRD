//useState is used to store credentials entered by user (ie.email and password).
//useEffect is used to clear input fields in login form as soon as , form component is mounted.
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; //to display either HR_Page or Student_Page needs to be displayed after login .
import "./LoginForm.css"; //write styling related to this component in this .css file itself.

//searchParams is used to indicate whether HR Login button / student Login button was clicked.
//in simple words to know , who clicked the Login button.
import { useSearchParams } from "react-router-dom";

function LoginForm() {
  //useSearchParams hook to get the 'role' query parameter from the URL.
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role"); // Get the 'role' query parameter , which indicates whether HR/student is trying to login.

  //these two states are used to store inputs entered by the user.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //used to display some component programmatically . But 'Link' is used if user directly decides which component to display.
  const navigate = useNavigate();

  // Clear username and password fields when the component mounts
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = async () => {
    try {
      //fetch value (ie.array from db.json which has key 'role')
      const response = await fetch(`http://localhost:3000/${role}`); //for HRLogin , it will fetch registeredHRs and for StudentLogin , it will fetch registeredStuds.
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const users = await response.json();
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        alert("Correct, proceed");
        // navigate("/dashboard");
        //❌here navigate to '/hr' if HR login is successful
        //❌navigate to '/student' if student login is successful
      } else {
        alert("Error: Incorrect username or password.");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      alert("Error: Unable to verify user");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      <div className="login-form">
        <label className="login-label">
          Email*:
          <input
            type="email"
            required
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="login-label">
          Password*:
          <input
            type="password"
            required
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="login-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
