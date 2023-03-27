import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { REACT_ROUTES } from "./constants/constants";
import "./index.css";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {REACT_ROUTES.map((ROUTE, index) => (
          <React.Fragment key={index}>
            <Route
              path={ROUTE.PATH}
              element={
                <React.Fragment>
                  {ROUTE.ELEMENT}
                  <ToastContainer />
                </React.Fragment>
              }
            />
          </React.Fragment>
        ))}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
