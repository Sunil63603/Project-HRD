//useState is used to store credentials entered by user (ie.email and password).
//useEffect is used to clear input fields in login form as soon as , form component is mounted.
import React, { useState, useEffect, isValidElement } from "react";
import { useNavigate } from "react-router-dom"; //to display either HR_Page or Student_Page needs to be displayed after login .
import "./LoginForm.css"; //write styling related to this component in this .css file itself.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isValidAccount, setIsValidAccount] = useState(true); //this variable indicates whether current attempt to login is valid or not

  //used to display some component programmatically . But 'Link' is used if user directly decides which component to display.
  const navigate = useNavigate(); //in this case , it is used to render component after successful login.

  //❌❌Is this useEffect really necessary❌❌
  // // Clear username and password fields when the component mounts.
  // useEffect(() => {
  //   setEmail("");
  //   setPassword("");
  // }, []); //empty dependency[] indicates that , this code runs only on initial render .

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  //this function is called when clicks on the submit button.
  const handleSubmit = async () => {
    try {
      //fetch value (ie.array from db.json which has key 'role').
      const response = await fetch(`http://localhost:3000/${role}`); //for HRLogin , it will fetch registeredHRs and for StudentLogin , it will fetch registeredStuds.
      if (!response.ok) {
        throw new Error("Network response was not ok"); //if theres some problem with server or fetching.
      }
      const validAccounts = await response.json(); //gets all the registered accounts of HRs or Students.

      //❌below account or its details are used to display/render specific account .
      const account = validAccounts.find(
        (validAccount) =>
          validAccount.email === email && validAccount.password === password
      ); //if both email and password are matching , then render page else display incorrect credentials message.

      if (account) {
        //If valid account, navigate to the respective page
        if (role === "registeredHRs") {
          navigate(`/hr/create-job`); //if HR Login is successful , then display HR_Page.
        } //registeredStuds.
        else {
          navigate(`/student/groupMessages`); //if Student Login is successful , then display Student_Page.
        }
      } else {
        setIsValidAccount(false); //making this false , will indicate 'invalid credentials in UI'
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      alert("Error: Unable to verify user");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form
        onKeyDown={(e) => {
          // e.preventDefault();
          if (e.key === "Enter") {
            handleSubmit(); // Trigger the login function.
          }
        }}
      >
        <div className="login-form">
          <label className="login-label">email*:</label>
          <input
            type="email"
            required
            className={`login-input ${!isValidAccount ? "invalid-input" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="login-label">Password*:</label>
          <div style={{ position: "relative" }}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              required
              className={`login-input ${
                !isValidAccount ? "invalid-input" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: "40px" }}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
            </span>
          </div>

          {!isValidAccount && (
            <p className="invalid-message">
              Invalid credentials. Please try again.
            </p>
          )}

          <button
            className="login-button"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
