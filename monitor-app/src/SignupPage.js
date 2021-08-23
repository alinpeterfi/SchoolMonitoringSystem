import React from "react";
import ValidateForm from "./ValidateForm";
// name validation
const nameValidation = (fieldName, fieldValue) => {
  if (fieldValue.trim() === "") {
    return `${fieldName} is required`;
  }
  // only letters
  if (/[^a-zA-Z -]/.test(fieldValue)) {
    return "Invalid characters";
  }
  if (fieldValue.trim().length < 3) {
    return `${fieldName} needs to be at least three characters`;
  }
  return null;
};
//  email validation
const emailValidation = (email) => {
  if (
    // email structure name@domain.country
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
//  password validation
const passwordValidation = (password) => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password is shorter than 6 characters";
  }

  return null;
};
// phone validation
const phoneValidation = (phone) => {
  if (!phone.trim()) {
    return "Phone number is required";
  }
  // phone number validation
  if (!/[^a-zA-Z -]/.test(phone)) {
    return "Invalid characters";
  }
  if (phone.length > 10) {
    return "Phone number is too long";
  }
  if (phone.length < 10) {
    return "Phone number is too short";
  }
  return null;
};
//username validation
const usernameValidation = (username) => {
  if (!username.trim()) {
    return "Username is required";
  }
  if (username.length < 3) {
    return "Username is shorter than 3 characters";
  }

  return null;
};
// all validations
const validate = {
  username: usernameValidation,
  firstName: (name) => nameValidation("First Name", name),
  lastName: (name) => nameValidation("Last Name", name),
  email: emailValidation,
  phone: phoneValidation,
  password: passwordValidation,
};
// setting the initial values
const initialValues = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

function Signuppage() {
  return (
    <ValidateForm
      validate={validate}
      initialValues={initialValues}
      page={"/loginpage"}
    />
  );
} //class

export default Signuppage;
