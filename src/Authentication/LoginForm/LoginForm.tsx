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
import { Github } from "react-bootstrap-icons";
//this file contains all the CSS related to the LoginForm.jsx

//❌❌❌Export interfaces from this file to the entire application
//interface for registeredStudents and registeredHRs
export interface registeredStuds {
  USN: string;
  profileImg: string;
  website: string;
  name: string;
  email: string;
  password: string;
  mobile: string;
  resumes: string[];
  socialContacts: socialContacts;
  skills: string[];
  Projects: Projects[];
  phoneNumber: string;
  companiesAppliedTo: string[];
  conversationsWithHR?: conversationsWithHR[];
  id: string;
}

export interface socialContacts {
  linkedin: string;
  github: string;
  mail: string;
  whatsapp: string;
}

export interface Projects {
  title: string;
  videoLink: string;
  GitHub_Repo: string;
  deployLink: string;
}

export interface conversationsWithHR {
  sender: string;
  content: string;
  timestamp: string;
}

export interface registeredHRs {
  name: string;
  email: string;
  password: string;
  id: string;
}

function LoginForm() {
  //i should have stored 'role' using localStorage.
  //these below two lines are used to get the role/designation of the user who is trying to login.
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");

  //State variables in this file are local(not shared within any other component).So,Zustand is not necessary in this case.
  //when you implement proper authentication,then you need these variables throughout the application.So,Zustand is used in that case
  //Basically just move these variables into global store.
  //these below two lines are used to store the email and password entered by user.
  const [email, setEmail] = useState<string>("SJCIT-HRD@gmail.com");
  const [password, setPassword] = useState<string>("123321");

  //state variables to indicate status of password visibility and account validity.
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false); //false by default.
  const [isValidAccount, setIsValidAccount] = useState<boolean>(true);

  //this is the variable which is used to navigate to HR and student interface from login page.
  const navigate = useNavigate();

  //Reset email and password fields on component mount.
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);
  //useEffect requires explicit typing incase of custom dependency array or when returning a cleanup function.

  //this function is called when user clicks on 'eye' icon/emoji.
  //this function is doesnt take in any parameter and doesnt return anything . So, TS is not required
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev: boolean) => !prev); //just toggles the previous state.
  };

  //this function may throw error which is handled by catch block.So,function is not directly responsible for that.
  //this function is async(means returns promise) and returns nothing(void).
  const handleSubmit = async (): Promise<void> => {
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
      let validAccounts: registeredHRs[] | registeredStuds[]; //this can be either HRs or students.
      validAccounts = await response.json();

      //check if there's any account with the entered credentials
      //if 'yes',then account is valid else account is invalid.
      //find may return undefined if there's no account with the entered credentials.
      const account: registeredHRs | registeredStuds | undefined =
        validAccounts.find(
          (validAccount: registeredHRs | registeredStuds) =>
            validAccount.email === email && validAccount.password === password
        );

      //if the account is valid.
      if (account) {
        setIsValidAccount(true); //indicating that the account is valid
        if (role === "registeredHRs") {
          navigate(`/hr/create-job`); //navigate to 'create-job' page if HR logs-in successfully
          PopUpToast.success("HR Login successful");
        } else if ("USN" in account) {
          //By using 'in' operator,you explicitly tell TS to treat account as registeredStuds in this block
          //when the account is student , then TS should not check for registeredHRs typing.
          // TS is treating account.USN as unknown type.
          const studentUSN: string = (account as registeredStuds).USN; //So,we need to explicitly tell TS that account is registeredStuds.
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

  //❌Dont forget to write TS for this👇
  const handleForgotPassword = () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-300 to-blue-300 font-sans text-gray-900">
      <h2 className="text-4xl mb-5 text-gray-900 shadow-md">Login</h2>
      <form
        onKeyDown={(e: React.KeyboardEvent<HTMLFormElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
      >
        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center w-[400px] h-[350px]">
          <label className="text-sm mb-1 text-gray-600 w-full">Email*:</label>
          <input
            type="email"
            required
            className={`w-full p-2 border ${
              !isValidAccount ? "border-red-500 bg-red-100" : "border-gray-300"
            } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <label className="text-sm mt-4 mb-1 text-gray-600 w-full">
            Password*:
          </label>
          <div className="relative w-full">
            <input
              type={isPasswordVisible ? "text" : "password"}
              // type="input"
              required
              className={`w-full p-2 border ${
                !isValidAccount
                  ? "border-red-500 bg-red-100"
                  : "border-gray-300"
              } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              style={{ paddingRight: "40px" }}
            />
            {/* Replaced FontAwesomeIcon with plain text for toggling visibility */}
            <span
              onClick={(e: React.MouseEvent<HTMLSpanElement>) =>
                togglePasswordVisibility()
              }
              className="absolute right-3 top-1.5 transform-translate-y-1/2 cursor-pointer text-xl"
            >
              {isPasswordVisible ? "🙈" : "👁️"}
            </span>
            <span
              className="text-red-500 hover:text-blue-700 cursor-pointer mt-2 block"
              onClick={(e: React.MouseEvent<HTMLSpanElement>) =>
                handleForgotPassword()
              }
            >
              Forgot Password
            </span>
          </div>

          {!isValidAccount && (
            <p className="text-red-500 text-md mt-2">
              Invalid credentials. Please try again.
            </p>
          )}

          <button
            className="w-full mt-5 bg-blue-500 text-white p-3 rounded-full transition-transform hover:translate-y-[-2px] hover:bg-blue-700 shadow-md"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
