//server-components

import HR_Navbar_Client_Comp from "./HR_NavbarClientComp";

const Navbar: React.FC = () => {
  return (
    <nav className="flex sticky top-0 justify-between items-center p-4 bg-blue-500 text-white shadow-md rounded-md z-50">
      <HR_Navbar_Client_Comp></HR_Navbar_Client_Comp>
    </nav>
  );
};

export default Navbar;
