import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PopUpToast from "../../Global Components/PopUpToast/PopUpToast";
import "./LoginForm.css";

function LoginForm() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isValidAccount, setIsValidAccount] = useState(true);

  const navigate = useNavigate();

  // Optional: Reset email and password fields on component mount.
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      PopUpToast.warning("Please fill in all fields");
      return;
    }

    try {
      // Replace with the JSONBin API endpoint and your API key
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/${role}.json`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const validAccounts = await response.json();

      const account = validAccounts.find(
        (validAccount) =>
          validAccount.email === email && validAccount.password === password
      );

      if (account) {
        if (role === "registeredHRs") {
          navigate(`/hr/create-job`);
          PopUpToast.success("HR Login successful");
        } else {
          navigate(`/student/groupMessages`);
          PopUpToast.success("Student Login successful");
        }
      } else {
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
