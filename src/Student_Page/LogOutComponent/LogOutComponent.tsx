import React from "react";
import { useLogOut } from "../../context/LogOutContext";
import { useNavigate } from "react-router-dom";
import "./LogOutComponent.css";

const LogOutComponent = (): JSX.Element | null => {
  const { isLogOutContainerVisible, hideLogOutContainer } = useLogOut();
  const navigate = useNavigate();

  if (!isLogOutContainerVisible) return null; //Dont render if the variable is 'false'

  return (
    <>
      <div className="fixed inset-0 w-full h-full bg-[rgba(30,30,30,0.5)] flex justify-center items-center z-[1000]">
        <div className="bg-white p-5 rounded-lg shadow-md text-center">
          <h2>Are you sure you want to log out?</h2>
          <div className="mt-4 flex justify-around">
            <button
              className="bg-red-600 text-white border-none p-2.5 px-5 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-red-800"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                navigate("/"); //redirect to login page
                hideLogOutContainer && hideLogOutContainer(); //Hide the container
              }}
            >
              Yes
            </button>
            <button
              className="bg-green-400 text-black border-none p-2.5 px-5 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-green-500"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                hideLogOutContainer && hideLogOutContainer()
              }
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogOutComponent;
