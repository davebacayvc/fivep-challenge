import classnames from "classnames";
import React from "react";
import "./Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "solid" | "light" | "danger";
}
const Button: React.FC<ButtonProps> = (props) => {
  const buttonClassnames = classnames("custom-button", {
    light: props.variant === "light",
    dark: props.variant === "solid",
    danger: props.variant === "danger",
  });

  return <button {...props} className={buttonClassnames}></button>;
};

export default Button;
