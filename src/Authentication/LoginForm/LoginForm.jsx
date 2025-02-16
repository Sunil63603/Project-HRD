import React, { useState, useEffect } from "react";
//useState is used to store the email and password entered by user.And also it is used to store the password visibility status and account validity status.
//useEffect is used to reset the 'password' and 'email' attributes when the component is mounted.

import { useNavigate } from "react-router-dom";
//used to navigate to HR interface when HR log-in is successful.
//used to navigate to student interface when student log-in is successful.

import { useSearchParams } from "react-router-dom";
//when HR tries to login,then credentials must be retrieved and compared from 'registeredHRs'.
//when student tries to login,then credentials must be retrieved and compared from 'registeredStuds'.
//so,to decide where to retrieve credentials,is done by useSearchParams.

import PopUpToast from "../../Global Components/PopUpToast/PopUpToast";
//PopUpToast is used to display successful logins,invalid credentials..etc

import "./LoginForm.css";
//this file contains all the CSS related to the LoginForm.jsx

function LoginForm() {
  //these below two lines are used to get the role/designation of the user who is trying to login.
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");

  //these below two lines are used to store the email and password entered by user.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //state variables to indicate status of password visibility and account validity.
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); //false by default.
  const [isValidAccount, setIsValidAccount] = useState(true);

  //this is the variable which is used to navigate to HR and student interface from login page.
  const navigate = useNavigate();

  //Reset email and password fields on component mount.
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  //this function is called when user clicks on 'eye' icon/emoji
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev); //just toggles the previous state.
  };

  const handleSubmit = async () => {
    //if 'email' and 'password' inputs are empty and user tries to login.
    if (!email || !password) {
      PopUpToast.warning("Please fill in all fields");
      return;
    }

    try {
      //this is the API endpoint URL to get the credentials of HR/student.
      //based on 'role',all valid accounts are fetched.
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/${role}.json`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      //validAccounts are nothing but registeredAccounts
      const validAccounts = await response.json();

      //check if there's any account with the entered credentials
      //if 'yes',then account is valid else account is invalid.
      const account = validAccounts.find(
        (validAccount) =>
          validAccount.email === email && validAccount.password === password
      );

      //if the account is valid.
      if (account) {
        setIsValidAccount(true); //indicating that the account is valid
        if (role === "registeredHRs") {
          navigate(`/hr/create-job`); //navigate to 'create-job' page if HR logs-in successfully
          PopUpToast.success("HR Login successful");
        } else {
          const studentUSN = account.USN;
          navigate(`/student/profile?studentUSN=${studentUSN}`); //if student logs-in successfully,navigate to 'groupMessages' page.
          PopUpToast.success("Student Login successful");
        }
      } //if the account is invalid.
      else {
        setIsValidAccount(false);
        PopUpToast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      PopUpToast.error("Error: Unable to verify user");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
      >
        <div className="login-form">
          <label className="login-label">Email*:</label>
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
              // type="input"
              required
              className={`login-input ${
                !isValidAccount ? "invalid-input" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: "40px" }}
            />
            {/* Replaced FontAwesomeIcon with plain text for toggling visibility */}
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
            >
              {isPasswordVisible ? "🙈" : "👁️"}
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
