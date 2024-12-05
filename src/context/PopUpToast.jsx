//Add all global PopUpToast notfications into this file
import React, { createContext, useState, useContext } from "react";

//create the context
const PopUpToastContext = createContext();

//create a provider component
export const PopUpToastProvider = ({ children }) => {
  const [newJobAlert, setNewJobAlert] = useState(false);
  //becomes true when HR posts a new JOB.
  // ❌Once student gets notified , i think student should make it false,else notification keeps coming❌

  const handleJobAlert = (boolean) => setNewJobAlert(boolean); //HR will set it to true ,
  //and may be student will set it to false.

  return (
    <PopUpToastProvider
      value={{
        newJobAlert,
        setNewJobAlert,
      }}
    >
      {children}
    </PopUpToastProvider>
  );
};

//create a custom hook to use the context
export const usePopUpToast = () => useContext(PopUpToastContext);
