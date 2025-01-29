import React, { createContext, useContext } from "react";

//create the context
const GlobalContext = createContext();

//create a provider component
export const GlobalProvider = ({ children }) => {
  const pollingInterval = 10000000000000; //store polling interval value and make it accessible to entire project.

  return (
    <GlobalContext.Provider value={{ pollingInterval }}>
      {children}
    </GlobalContext.Provider>
  );
};

//custom hook to use the globalContext
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
