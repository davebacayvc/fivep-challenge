import classNames from "classnames";
import React, { memo } from "react";
import "./FormInput.scss";

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorText?: string;
  labelClassname?: string;
}
const FormInput: React.FC<FormInputProps> = (props) => {
  const inutClassnames = classNames("form__field", props.className, {
    "form__error-field": !!props.errorText,
  });
  const labelClassnames = classNames("form__label", props.labelClassname);

  return (
    <div className="form__group">
      <input
        type={props.type}
        id={props.id}
        className={inutClassnames}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
      <label htmlFor={props.id} className={labelClassnames}>
        {props.placeholder}
      </label>
      {!!props.errorText ? (
        <div className="error-message">{props.errorText}</div>
      ) : null}
    </div>
  );
};

export default memo(FormInput);
