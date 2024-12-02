import React from "react";
import { useLogOut } from "../../context/LogOutContext";
import { useNavigate } from "react-router-dom";
import "./LogOutComponent.css";

const LogOutComponent = () => {
  const { isLogOutContainerVisible, hideLogOutContainer } = useLogOut();
  const navigate = useNavigate();

  if (!isLogOutContainerVisible) return null; //Dont render if the variable is 'false'

  return (
    <>
      <div className="overlay">
        <div className="log-out-container">
          <h2>Are you sure you want to log out?</h2>
          <div className="log-out-actions">
            <button
              className="log-out-btn"
              onClick={() => {
                navigate("/"); //redirect to login page
                hideLogOutContainer(); //Hide the container
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
