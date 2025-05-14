import React from "react";

import Stud_Navbar_Client_Comp from "./Stud_Navbar_Client_Comp";

const Stud_Navbar: React.FC = () => {
  return (
    <nav className="flex sticky top-0 justify-between items-center p-4 bg-blue-500 text-white shadow-md rounded-md z-50 mb-5">
      <Stud_Navbar_Client_Comp></Stud_Navbar_Client_Comp>
    </nav>
  );
};

export default Stud_Navbar;
