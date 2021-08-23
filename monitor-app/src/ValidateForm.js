import FormSignup from "./FormSignup";
import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function FormValidate({ initialValues, validate, page }) {
  const [values, setValues] = useState(initialValues);

  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState({});

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [signUpStatus, setSignUpStatus] = useState("");

  let history = useHistory();

  // change event handler
  const handleChange = (e) => {
    const { name, value: newValue, type } = e.target;

    // keep number fields as numbers
    const value = type === "number" ? +newValue : newValue;

    // save field values
    setValues({
      ...values,
      [name]: value,
    });

    // was the field modified
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // remove whatever error was there previously
    const { [name]: removedError, ...rest } = errors;

    // check for a new error
    const error = validate[name](value);

    // // validate the field if the value has been touched
    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error }),
    });
  };

  // form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // validate the form
    const formValidation = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validate[key](values[key]);
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError }),
          },
          touched: {
            ...acc.touched,
            ...newTouched,
          },
        };
      },
      {
        errors: { ...errors },
        touched: { ...touched },
      }
    );
    setErrors(formValidation.errors);
    setTouched(formValidation.touched);

    if (
      !Object.values(formValidation.errors).length && // errors object is empty
      Object.values(formValidation.touched).length ===
        Object.values(values).length && // all fields were touched
      Object.values(formValidation.touched).every((t) => t === true) // every touched field is true
    ) {
      // start post
      //setting for viewing the success div

      // post
      Axios.post("http://localhost:3001/signup", {
        username: values.username,
        password: values.password,
        lastName: values.lastName,
        firstName: values.firstName,
        email: values.email,
        phone: values.phone,
      }).then((response) => {
        if (response.data.message) {
          setSignUpStatus(response.data.message);
        } else {
          setSignUpStatus(
            "You have successfully signed up, you can Log in now!"
          );
          // stop post
          // switch to the page after 2 secs
          window.setTimeout(function () {
            history.push(page);
          }, 2000); //timeout
        }
      });
    } //if
    else {
      setSignUpStatus("Please enter valid data!");
    } //else
    toggle();
  }; //handle submit
  //IN CASE IT CRASHES, AM RENUNTAT LA <> </>
  return (
    <FormSignup
      handleBlur={handleBlur}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      errors={errors}
      touched={touched}
      values={values}
      modal={modal}
      signUpStatus={signUpStatus}
      toggle={toggle}
    />
  );
}

export default FormValidate;
