//this is server component.

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //Import the default styles
//External CSS is not required

//Function-based reusable component
const PopUpToastProvider = {
  success: (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000, //close notification after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
  error: (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
  info: (message: string) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
  warning: (message: string) => {
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

//include ToastContainer once in the root component(ie.Layout.jsx in this case)
export const ToastRootContainer = () => <ToastContainer></ToastContainer>;

export default PopUpToastProvider;
