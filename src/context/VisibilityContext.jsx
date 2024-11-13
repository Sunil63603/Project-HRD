//this file is used to store profileSection visibility status,allProfilesVisibilityStatus,UpdatesStatus,jobSection Visibility.
// ❌implement messageHRD component visibility status.
// todo:create custom context provider in this file

//useState hook is used to store profileSection visibility status,and rest ... visibilty status.
import React, { createContext, useState } from "react";

// Create the context
export const VisibilityContext = createContext();

// Create the provider function.
export const VisibilityProvider = ({ children }) => {
  //accepts components which can access this context , as children prop.
  
  const [isProfileVisible, setIsProfileVisible] = useState(false); // Default to visible.
  // toggle this state variable when user clicks on 'profile' icon in topFixedBar.

  // Function to toggle the visibility of the profile section
  const toggleProfileVisibility = () => {
    setIsProfileVisible((prevVisibility) => !prevVisibility);
  };

  //this state is used to display whether job section should be displayed or not
  const [isJobsVisible,setIsJobsVisible] = useState(false);

  const toggleJobsVisibility = () =>{
    setIsJobsVisible((prevVisibility)=>!prevVisibility);

    //set All profiles visibility to false
    setIsAllProfilesVisible(false);
    //set updates visibility to false.
    setIsUpdatesVisible(false);
    //❌set messageHRD_Visibility to false
  }

  //this state is used to display whether all profiles' section should be displayed or not
  const [isAllProfilesVisible, setIsAllProfilesVisible] = useState(false);

  //this function is used to toggle the visibility of the All profiles section
  const toggleAllProfilesVisibility = () => {
    setIsAllProfilesVisible((prevVisibility) => !prevVisibility);

    //toggle jobs visibility to false
    setIsJobsVisible(false);
    //set updatesVisibility to false.
    setIsUpdatesVisible(false);
    //❌set messageHRD_Visibility to false
  };

  //this state is used to display whether updates section should be displayed or not
  const [isUpdatesVisible, setIsUpdatesVisible] = useState(true);//by default only updates section is visible.

  //this function is used to toggle the visibilty of the updatesSection
  const toggleUpdatesVisibility = () => {
    setIsUpdatesVisible((prevVisibility) => !prevVisibility);

    //set jobs visibility to false
    setIsJobsVisible(false);
    //set Allprofiles visibility to false
    setIsAllProfilesVisible(false);
    //❌set messageHRD_Visibility to false

  };

  //❌implement messageHRD component visibility status logic here.
  

  return (
    // value prop indicates props provided by this context which can be used by children components
    <VisibilityContext.Provider
      value={{
        isProfileVisible,
        toggleProfileVisibility,
        isJobsVisible,
        toggleJobsVisibility,
        isAllProfilesVisible,
        toggleAllProfilesVisibility,
        isUpdatesVisible,
        toggleUpdatesVisibility,
        // ❌include messageHRD state variable and updating function here.
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
};

// ❌Create custom context provider.
