import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../constants/routes";
import Spinner from "../Spinner/Spinner";
import "./Wrapper.scss";
import "react-toastify/dist/ReactToastify.css";

type WrapperProps = {
  loading?: boolean;
  error?: boolean;
  children: React.ReactNode;
  className?: string;
};

const Wrapper: React.FC<WrapperProps> = (props) => {
  const wrapperClassnames = classNames("wrapper", props.className);
  if (props.loading) {
    return <Spinner isVisible={true} />;
  }
  if (props.error) {
    return (
      <div className="erorr-404-container">
        <h1>INVALID</h1>
        <p>Error Occured</p>
        <Link to={PATHS.HOME}>Go back to the home page</Link>
      </div>
    );
  }
  return <div className={wrapperClassnames}>{props.children}</div>;
};

Wrapper.defaultProps = {
  error: false,
  loading: false,
};

export default Wrapper;
