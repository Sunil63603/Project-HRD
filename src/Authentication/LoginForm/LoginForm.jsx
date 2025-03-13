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
  //i should have stored 'role' using localStorage.
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
          //Here store student USN in local storage . And Usn is cleared when student clicks on 'logout'.

          localStorage.setItem("studentUSN", studentUSN);

          navigate(`/student/groupMessages`); //if student logs-in successfully,navigate to 'profile' page.
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

  const handleForgotPassword = () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email*:
          </label>
          <input
            type="email"
            required
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              !isValidAccount ? "border-red-500" : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password*:
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              // type="input"
              required
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                !isValidAccount ? "border-red-500" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: "40px" }}
            />
            {/* Replaced FontAwesomeIcon with plain text for toggling visibility */}
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
            >
              {isPasswordVisible ? "🙈" : "👁️"}
            </span>
            <text
              className="text-blue-500 hover:text-blue-700 cursor-pointer mt-2 block"
              onClick={handleForgotPassword}
            >
              Forgot Password
            </text>
          </div>

          {!isValidAccount && (
            <p className="text-red-500 text-xs italic mb-4">
              Invalid credentials. Please try again.
            </p>
          )}

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
