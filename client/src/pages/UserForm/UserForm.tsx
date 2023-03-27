import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { PROJECT_DESCRIPTION, TOAST_CONFIG } from "../../constants/constants";
import Banner from "../../library/Banner/Banner";
import Container from "../../library/Container/Container";
import * as Yup from "yup";
import FormikTextInput from "../../library/FormikInput/FormikInput";
import Wrapper from "../../library/Wrapper/Wrapper";
import "./UserForm.scss";
import Button from "../../library/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import PATHS from "../../constants/routes";
import ENDPOINTS from "../../constants/endpoints";
import { UsersData } from "../../hooks/useFetchUsers";
import getUrlParams from "../../helpers/getUrlParams";
import { toast } from "react-toastify";

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UsersData>();
  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
  };

  /** Use the YUP validation for validating the form fields. */
  const validationSchema = Yup.object({
    name: Yup.string().required("Name field is required."),
    email: Yup.string()
      .email("Invalid Email Address.")
      .required("Email Address field is required."),
    phoneNumber: Yup.string().required("Phone Number field is required."),
  });

  /** Get the mode in the URL */
  const { mode } = useParams();

  /** Variable for getting the edit mode */
  const isEditMode = mode === "edit";

  /** Trigger the fetcing if the mode is edit. */
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const userId = getUrlParams().get("userId");

      const response = await fetch(
        ENDPOINTS.USER_INFO_WITH_ID.replace(":id", userId ?? "")
      );

      const data = await response.json();
      setUser(data);
      setLoading(false);
    };

    if (isEditMode) {
      fetchUser();
    }
  }, [isEditMode]);

  /** Changing the button label depends on the mode */
  const buttonLabel = isEditMode ? "Edit User" : "Add User";

  const submitHandler = async (values: UsersData) => {
    const userId = getUrlParams().get("userId");

    /** Conditional http method  */
    const method = isEditMode ? "PUT" : "POST";

    /** Toast Message */
    const toastMesage = isEditMode ? "User Updated" : "User Added";

    /** Body data for add mode. */
    const addBodyData = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      email: values.email,
    };

    /** Reusing the values from add body data. So if the mode is edit, there will be a additional id property. */
    const editBodyData = {
      ...addBodyData,
      id: userId,
    };

    setLoading(true);
    fetch(ENDPOINTS.USER_INFO, {
      method,
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(isEditMode ? editBodyData : addBodyData),
    })
      .then((res) => res.json())
      .then((res) => {
        toast.info(toastMesage, TOAST_CONFIG);
        navigate(PATHS.HOME);
      });
  };

  return (
    <Wrapper className="user-form-wrapper" loading={loading} error={false}>
      <Container>
        <Banner
          title={PROJECT_DESCRIPTION.TITLE}
          description={PROJECT_DESCRIPTION.DESCRIPTION}
          backConfigs={{
            isVisible: true,
            text: "Back to the home page",
            handler: () => navigate(PATHS.HOME),
          }}
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => submitHandler(values)}
        >
          {({ values, resetForm, handleSubmit }) => {
            /** Handler for deleting all active data in the form state. */
            const resetHandler = () => {
              resetForm();
              setUser(initialValues);
            };

            return (
              <React.Fragment>
                <FormikTextInput
                  placeholder="Name (Required)"
                  name="name"
                  id="name"
                  value={values.name || user?.name}
                />
                <FormikTextInput
                  placeholder="Email Address (Required)"
                  name="email"
                  id="email"
                  value={values.email || user?.email}
                />
                <FormikTextInput
                  placeholder="Phone Number (Required)"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={values.phoneNumber || user?.phoneNumber}
                />
                <div className="form-actions">
                  <Button variant="light" onClick={() => resetHandler()}>
                    Reset Form
                  </Button>
                  <Button
                    variant="solid"
                    onClick={() => handleSubmit()}
                    type="submit"
                  >
                    {buttonLabel}
                  </Button>
                </div>

                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
              </React.Fragment>
            );
          }}
        </Formik>
      </Container>
    </Wrapper>
  );
};

export default UserForm;
