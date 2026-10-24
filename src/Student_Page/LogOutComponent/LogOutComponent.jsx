import { useLogOut } from "../../context/LogOutContext";
import { useNavigate } from "react-router-dom";
import "./LogOutComponent.css";

const LogOutComponent = () => {
  const { isLogOutContainerVisible, hideLogOutContainer, logout } = useLogOut();
  const navigate = useNavigate();

  if (!isLogOutContainerVisible) return null;

  return (
    <>
      <div className="overlay">
        <div className="log-out-container">
          <h2>Are you sure you want to log out?</h2>
          <div className="log-out-actions">
            <button
              className="log-out-btn"
              onClick={async () => {
                try {
                  await logout();
                  navigate("/");
                } catch (error) {
                  alert("Logout failed");
                }
              }}
            >
              Yes
            </button>
            <button className="cancel-btn" onClick={hideLogOutContainer}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogOutComponent;
