import React from "react";
import Button from "../Button/Button";
import "./Dialog.scss";

interface DialogProps {
  isVisible: boolean;
  onButtonClick: () => void;
  onClose: () => void;
  text: string;
  header: string;
}
const Dialog: React.FC<DialogProps> = (props) => {
  if (props.isVisible) {
    return (
      <div className="dialog-wrapper">
        <div className="dialog-content">
          <h2>{props.header}</h2>
          <p>{props.text}</p>
          <div className="dialog-actions">
            <Button variant="light" onClick={props.onClose}>
              Close
            </Button>
            <Button variant="solid" onClick={props.onButtonClick}>
              Yes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <React.Fragment />;
};

export default Dialog;
