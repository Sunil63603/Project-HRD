"use client"; //this component is using 'useRouter'.

import React, { JSX } from "react";
import { useRouter } from "next/navigation"; //when log-out is confirmed , change URL .

import { useLogOut } from "../../../contexts/LogOutContext"; //this context contains 3 state members
//isLogOutContainerVisible, showLogOutContainer and hideLogOutContainer

const LogOutClientComp = (): JSX.Element | null => {
  const router = useRouter(); //when log-out is confirmed , change URL .
  //useRouter is a hook that gives access to the router object, which allows us to navigate programmatically.

  const { isLogOutContainerVisible, hideLogOutContainer } = useLogOut(); //destructuring the context
  if (!isLogOutContainerVisible) return null; //Dont render if the variable is 'false'.

  return (
    <>
      <button
        className="bg-red-600 text-white border-none p-2.5 px-5 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-red-800"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          router.push("/"); //redirect to landing page
          hideLogOutContainer && hideLogOutContainer(); //Hide the container.
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
    </>
  );
};

export default LogOutClientComp;
