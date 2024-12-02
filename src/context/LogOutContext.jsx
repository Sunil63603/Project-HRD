import React, { createContext, useState, useContext } from "react";

//create the context
const LogOutContext = createContext();

//create a provider component
export const LogOutProvider = ({ children }) => {
  const [isLogOutContainerVisible, setLogOutContainerVisible] = useState(false);

  //Function to show the log-out container
  const showLogOutContainer = () => setLogOutContainerVisible(true);

  //function to hide the log-out container
  const hideLogOutContainer = () => setLogOutContainerVisible(false);

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
