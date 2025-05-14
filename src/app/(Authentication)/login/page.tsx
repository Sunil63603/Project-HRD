//this is a server component which displays login form.

import { JSX } from "react";
import LoginClientComp from "./(loginClientComp)/loginClientComp";

function LoginForm(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 font-sans text-gray-900">
      <h2 className="text-4xl mb-5 text-gray-900 shadow-md">Login</h2>
      <LoginClientComp></LoginClientComp>
    </div>
  );
}

export default LoginForm;
