//Add all global PopUpToast notfications into this file
import React, { createContext, useState, useContext } from "react";

//create the context
const PopUpToastContext = createContext();

//create a provider component
export const PopUpToastProvider = ({ children }) => {
  const [newJobAlert, setNewJobAlert] = useState(false);
  //becomes true when HR posts a new JOB.
  // ❌Once student gets notified , i think student should make it false,else notification keeps coming❌
  console.log(newJobAlert);

  const handleJobAlert = () => {
    setNewJobAlert(true);
    console.log(newJobAlert);

    // Reset the alert after 5 seconds
    setTimeout(() => {
      setNewJobAlert(false);
      console.log(newJobAlert);
    }, 10000); // 5000 ms = 5 seconds
  };

  return (
    <PopUpToastContext.Provider
      value={{
        newJobAlert,
        handleJobAlert,
      }}
    >
      {children}
    </PopUpToastContext.Provider>
  );
};

//create a custom hook to use the context
export const usePopUpToastContext = () => useContext(PopUpToastContext);

//❌❌The logic of notifying students for new job alert is not working as expected❌❌
