import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the default toast styles
// External CSS is not required

// Function-based reusable component
const PopUpToast = {
  success: (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000, // Close after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
  error: (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
  info: (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
  warning: (message) => {
    toast.warn(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
};

// Include ToastContainer once in the root component (or App.js)
export const ToastRootContainer = () => <ToastContainer />;

export default PopUpToast;

// import React, { useEffect } from "react";
// import "./Alert.css"; // Import the styling file

// export default function Alert({ message, type }) {
//   return (
//     <div className={`toast-container ${type}`}>
//       <span className="toast-message">{message}</span>
//       {/* <button className="toast-close" onClick={onClose}>
//         &times;
//       </button> */}
//     </div>
//   );
// }
