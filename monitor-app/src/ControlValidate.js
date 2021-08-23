import ControlPanel from "./ControlPanel";
import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function ControlValidate({ initialValues, validate, page, initCheck }) {
  const [values, setValues] = useState(initialValues);

  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState({});

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [controlStatus, setControlStatus] = useState("");
  let history = useHistory();

  // we define the initial state so we wouldn't have undefined initially

  const [checked, setChecked] = useState(initCheck);

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

  const handleCheckBox = () => {
    setChecked(!checked);
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
    // var checking;
    if (
      !Object.values(formValidation.errors).length && // errors object is empty
      Object.values(formValidation.touched).length ===
        Object.values(values).length && // all fields were touched
      Object.values(formValidation.touched).every((t) => t === true) // every touched field is true
    ) {
      //setting for viewing the success div
      setControlStatus("You have successfully updated your information!");

      // start post
      const user = JSON.parse(localStorage.getItem("currentUser"));
      Axios.post("http://localhost:3001/controlpanel", {
        username: user.username,
        rfid: values.rfid,
        unicode: values.unicode,
        lastName: values.lastName,
        firstName: values.firstName,
        email: values.email,
        phone: values.phone,
        sms: checked,
      }).then((response) => {
        //localastoarage setup
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            username: response.data[1][0].username,
            firstName: response.data[1][0].firstName,
            lastName: response.data[1][0].lastName,
            email: response.data[1][0].email,
            phone: response.data[1][0].phone,
            rfid: response.data[1][0].rfid,
            unicode: response.data[1][0].unicode,
            sms: response.data[1][0].sms,
          })
        );
      });
      toggle();
      // stop post
      // swith to the page after 2 secs
      window.setTimeout(function () {
        history.push(page);
      }, 2000);
    }
    //otherwise do not show modal
  };

  return (
    <>
      <ControlPanel
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        touched={touched}
        values={values}
        handleCheckBox={handleCheckBox}
        checked={checked}
        toggle={toggle}
        modal={modal}
        controlStatus={controlStatus}
      />
    </>
  );
}

export default ControlValidate;
