import React from "react";

//TS interfaces and type-aliases.
import ProfileSectionClientComp from "./(studProfileClientComp)/studProfileClientComp";

//when user clicks on icon in the left side of the screen,then this component will be displayed.
const ProfileSection: React.FC = () => {
  return (
    <>
      <ProfileSectionClientComp></ProfileSectionClientComp>
    </>
  );
};

export default ProfileSection;
