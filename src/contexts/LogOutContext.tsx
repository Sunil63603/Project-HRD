"use client"; //even context files are either client or server.

//this context is used for 'log-out' functionality in both HR and student interfaces.
import React, { createContext, useState, useContext, ReactNode } from "react";
//useState is used to manage the state of the log-out container visibility.

//TS interfaces
interface LogOutContextType {
  //variables and functions provided by this context.
  isLogOutContainerVisible: boolean;
  showLogOutContainer: () => void;
  hideLogOutContainer: () => void;
}

//create the context with a default value
const LogOutContext = createContext<Partial<LogOutContextType>>({});
//'partial' is used when we dont know the default value which should be passed to createContext().

//create a provider component
//'ReactNode' means JSX structure.
export const LogOutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLogOutContainerVisible, setIsLogOutContainerVisible] =
    useState<boolean>(false);

  //function to show the log-out container
  const showLogOutContainer = () => setIsLogOutContainerVisible(true);

  //function to hide the log-out container
  const hideLogOutContainer = () => setIsLogOutContainerVisible(false);

  return (
    <LogOutContext.Provider
      value={{
        isLogOutContainerVisible,
        showLogOutContainer,
        hideLogOutContainer,
      }}
    >
      {children}
    </LogOutContext.Provider>
  );
};

//create a custom hook to use the context
export const useLogOut = () => useContext(LogOutContext);
