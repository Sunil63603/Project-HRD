"use client";
import React, { JSX } from "react";

import LogOutClientComp from "./LogOutClientComp";
import { useRouter } from "next/navigation"; //when log-out is confirmed , change URL.

import { useLogOut } from "@/contexts/LogOutContext"; //this context contains 3 state members.
//isLogOutContainerVisible,showLogOutContainer and hideLogOutContainer.

const LogOutComponent = (): JSX.Element | null => {
  const router = useRouter(); //when log-out is confirmed,change URL.
  //useRouter is a hook that gives access to the router object,which allows us to navigate programmatically.

  const { isLogOutContainerVisible, hideLogOutContainer } = useLogOut(); //destructing the context.
  if (!isLogOutContainerVisible) return null; //Dont render if the variable is 'false'.

  return (
    <>
      <div className="fixed inset-0 w-full h-full bg-[rgba(30,30,30,0.5)] flex justify-center items-center z-[1000] text-black">
        <div className="bg-white p-5 rounded-lg shadow-md text-center">
          <h2>Are you sure you want to log out?</h2>
          <div className="mt-4 flex justify-around">
            <LogOutClientComp></LogOutClientComp>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogOutComponent;
