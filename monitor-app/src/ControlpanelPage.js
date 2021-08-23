import React from "react";

import ControlValidate from "./ControlValidate";
// name validation
const nameValidation = (fieldName, fieldValue) => {
  if (fieldValue.trim() === "") {
    return `${fieldName} is required`;
  }
  if (/[^a-zA-Z -]/.test(fieldValue)) {
    return "Invalid characters";
  }
  if (fieldValue.trim().length < 3) {
    return `${fieldName} needs to be at least three characters`;
  }
  return null;
};
// email validation
const emailValidation = (email) => {
  if (
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return null;
  }
  if (email.trim() === "") {
    return "Email is required";
  }
  return "Please enter a valid email";
};
// phone validation
const phoneValidation = (phone) => {
  if (!phone.trim()) {
    return "Phone number is required";
  }
  if (phone.length > 10) {
    return "Phone number is too long";
  }
  if (phone.length < 10) {
    return "Phone number is too short";
  }
  return null;
};
// rfidvalidation
const rfidValidation = (rfid) => {
  if (!rfid.trim()) {
    return "RFID is required";
  }
  if (rfid.length > 8) {
    return "RFID is too long";
  }
  if (rfid.length < 8) {
    return "RFID is too short";
  }
  return null;
};
// secret code validation
const unicodeValidation = (unicode) => {
  if (!unicode.trim()) {
    return "Unicode is required";
  }
  if (unicode.length > 8) {
    return "Unicode is too long";
  }
  return null;
};
// all validations
const validate = {
  firstName: (name) => nameValidation("First Name", name),
  lastName: (name) => nameValidation("Last Name", name),
  email: emailValidation,
  phone: phoneValidation,
  rfid: rfidValidation,
  unicode: unicodeValidation,
};

function Controlpanelpage() {
  var user = JSON.parse(localStorage.getItem("currentUser"));
  // setting the initial values
  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    rfid: user.rfid,
    unicode: user.unicode,
  };
  // so we could translate boolean
  var initCheck = !!+user.sms;
  return (
    <ControlValidate
      validate={validate}
      initialValues={initialValues}
      initCheck={initCheck}
      page={"/"}
    />
  );
} //class

export default Controlpanelpage;
