import React, { useEffect, useState } from "react";
import { useField } from "formik";
import FormInput, { FormInputProps } from "../FormInput/FormInput";

const FormikTextInput: React.FC<FormInputProps> = (props) => {
  const [field, meta, helper] = useField<string>(props.name ?? "");
  const errorText = meta.error && meta.touched ? meta.error : "";
  const [value, setValue] = useState(props.value || "");

  const handleOnChange = (event: any) => {
    const newValue = event.target.value || "";
    helper.setTouched(true, true);

    setValue(newValue);
    helper.setValue(newValue);
  };

  const handleOnBlur = (event: any) => {
    helper.setTouched(true, true);
  };

  useEffect(() => {
    const newValue = (props?.value as string) ?? "";
    setValue(newValue);
    helper.setValue(newValue);

    // eslint-disable-next-line
  }, [props?.value]);

  const clonedProps = {
    ...props,
  };

  return (
    <React.Fragment>
      <FormInput
        {...field}
        {...clonedProps}
        value={value}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        errorText={errorText}
        className="filled-input"
        type="text"
        placeholder={props.placeholder ?? "Add text here ..."}
      />
    </React.Fragment>
  );
};
export default FormikTextInput;
