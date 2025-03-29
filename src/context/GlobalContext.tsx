//convert this file into Zustand format.
import React, { createContext, useContext, ReactNode } from "react";

//TS imports,interfaces and type-aliases

interface GlobalContextType {
  pollingInterval: number;
}

//create the context
const GlobalContext = createContext<GlobalContextType>({
  pollingInterval: 100000000,
});

//create a provider component
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const pollingInterval = 100000000; //store polling interval value and make it accessible to entire project.

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
