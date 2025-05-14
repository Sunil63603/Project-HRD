import { JSX } from "react";

import MessageStudentClientComp from "./(messageStudentClientComp)/messageStudentClientComp";

//use JSX.Element when functional component doesnt take in any parameters ,else use React.FC
function MessageStudent(): JSX.Element {
  return (
    <>
      <MessageStudentClientComp></MessageStudentClientComp>
    </>
  );
}

export default MessageStudent;
