import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import PopUpToast from "../../Global Components/PopUpToast/PopUpToast";
import { useLogOut } from "../../context/LogOutContext";
import "./LoginForm.css";

function LoginForm() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");

  const { setUser } = useLogOut();

  //these below two lines are used to store the email and password entered by user.
  const [email, setEmail] = useState(
    role === "registeredHRs" ? "SJCIT-HRD@gmail.com" : "s60667843@gmail.com",
  );
  const [password, setPassword] = useState(
    role === "registeredHRs" ? "123321" : "sunilinus",
  );

  //state variables to indicate status of password visibility and account validity.
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); //false by default.
  const [isValidAccount, setIsValidAccount] = useState(true);

  //this is the variable which is used to navigate to HR and student interface from login page.
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev); //just toggles the previous state.
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      PopUpToast.warning("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password, role }),
        },
      );

      if (!response.ok) {
        setIsValidAccount(false);
        PopUpToast.error("Invalid credentials");
        return;
      }

      const data = await response.json();
      setUser(data);

      setIsValidAccount(true);

      if (data.role === "registeredHRs") {
        navigate("/hr/create-job");
        PopUpToast.success("HR Login successful");
      } else {
        navigate(`/student/profile?studentUSN=${data.USN}`);
        PopUpToast.success("Student Login successful");
      }
    } catch (error) {
      console.error(error);
      PopUpToast.error("Unable to login");
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
