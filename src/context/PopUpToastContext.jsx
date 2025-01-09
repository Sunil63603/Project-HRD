//Add all global PopUpToast notfications into this file
import React, { createContext, useState, useContext } from "react";

//create the context
const PopUpToastContext = createContext();
import { useGlobalContext } from "../context/GlobalContext";

//create a provider component
export const PopUpToastProvider = ({ children }) => {
  const { pollingInterval } = useGlobalContext();

  const [newJobAlert, setNewJobAlert] = useState(false);
  //becomes true when HR posts a new JOB.
  // ❌Once student gets notified , i think student should make it false,else notification keeps coming❌
  console.log(newJobAlert);

  const handleJobAlert = () => {
    setNewJobAlert(true);
    console.log(newJobAlert);

    setTimeout(() => {
      setNewJobAlert(false);
      console.log(newJobAlert);
    }, pollingInterval);
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
