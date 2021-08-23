import React from "react";
import PageFooter from "./PageFooter";
import NavbarHeader from "./NavbarHeader";
import "./SignupPage.css";
import { motion } from "framer-motion";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

function FormSignup({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  touched,
  values,
  modal,
  toggle,
  signUpStatus,
}) {
  return (
    <div className="container-div">
      <div className="signup-page-div">
        <div className="navbar-div">
          <NavbarHeader />
        </div>

        <div className="signup-page-body">
          <motion.div
            className="signup-page-panel container-div-shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="signup-page-panel-title">
              <p>Create an account</p>
            </div>
            <div className="signup-page-panel-form">
              <Form onSubmit={handleSubmit}>
                <div className="signup-page-panel-form-container">
                  <div className="signup-page-panel-form-item">
                    <FormGroup>
                      <Label className="signup-page-panel-label">
                        Username
                      </Label>
                      <Input
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="username"
                        className="form-control-signup"
                        type="text"
                        placeholder="Enter your username"
                      />
                      {touched.username && errors.username}
                    </FormGroup>
                  </div>
                  <div className="signup-page-panel-form-item">
                    <FormGroup>
                      <Label className="signup-page-panel-label">
                        First Name
                      </Label>
                      <Input
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="firstName"
                        className="form-control-signup"
                        type="text"
                        placeholder="Enter your First Name"
                      />
                      {touched.firstName && errors.firstName}
                    </FormGroup>
                  </div>
                  <div className="signup-page-panel-form-item">
                    <FormGroup>
                      <Label className="signup-page-panel-label">
                        Password
                      </Label>
                      <Input
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control-signup"
                        type="password"
                        placeholder="Enter your pasword"
                      />
                      {touched.password && errors.password}
                    </FormGroup>
                  </div>
                  <div className="signup-page-panel-form-item">
                    <FormGroup>
                      <Label className="signup-page-panel-label">
                        Last Name
                      </Label>
                      <Input
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="lastName"
                        className="form-control-signup"
                        type="text"
                        placeholder="Enter your Last Name"
                      />
                      {touched.lastName && errors.lastName}
                    </FormGroup>
                  </div>
                  <div className="signup-page-panel-form-item">
                    <FormGroup>
                      <Label className="signup-page-panel-label">
                        Email Address
                      </Label>
                      <Input
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="email"
                        className="form-control-signup"
                        type="email"
                        placeholder="Enter your email"
                      />
                      {touched.email && errors.email}
                    </FormGroup>
                  </div>
                  <div className="signup-page-panel-form-item">
                    <FormGroup>
                      <Label className="signup-page-panel-label">
                        Phone Number
                      </Label>
                      <Input
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="phone"
                        className="form-control-signup"
                        type="text"
                        placeholder="Enter your phone number"
                      />
                      {touched.phone && errors.phone}
                    </FormGroup>
                  </div>
                </div>
                <Button className="signup-page-panel-form-btn">Sign Up</Button>
              </Form>
            </div>
          </motion.div>
          <Modal className="login-page-modal" isOpen={modal} toggle={toggle}>
            <ModalBody toggle={toggle}>{signUpStatus}</ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>

      <PageFooter />
    </div> //container
  );
} //class

export default FormSignup;
