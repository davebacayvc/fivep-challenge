import { ToastOptions } from "react-toastify";
import Home from "../pages/Home/Home";
import InvalidRoute from "../pages/InvalidRoute/InavalidRoute";
import UserForm from "../pages/UserForm/UserForm";
import PATHS from "./routes";

export const PROJECT_DESCRIPTION = {
  TITLE: "FiveP Technical Project",
  DESCRIPTION: "Build a basic user-management application using React and .NET",
};

export const TOAST_CONFIG: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const REACT_ROUTES = [
  {
    ELEMENT: <Home />,
    PATH: PATHS.HOME,
  },
  {
    ELEMENT: <UserForm />,
    PATH: PATHS.USER_FORM,
  },
  {
    PATH: PATHS.INVALID,
    ELEMENT: <InvalidRoute />,
  },
  {
    PATH: "*",
    ELEMENT: <InvalidRoute />,
  },
];
