import { JSX } from "react"; //'student object' is fetched and stored as a state variable
//JSX is used for Typescript syntax.

import FriendProfileClientComp from "./friendProfileClientComp/friendProfileClientComp";

function FriendProfile(): JSX.Element {
  return (
    <>
      <FriendProfileClientComp></FriendProfileClientComp>
    </>
  );
}

export default FriendProfile;
