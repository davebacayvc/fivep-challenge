import Home from "../pages/Home/Home";
import InvalidRoute from "../pages/InvalidRoute/InavalidRoute";
import PATHS from "./routes";

export const REACT_ROUTES = [
  {
    ELEMENT: <Home />,
    PATH: PATHS.HOME,
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
