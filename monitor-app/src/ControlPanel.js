import React from "react";
import "./ControlpanelPage.css";
import PageFooter from "./PageFooter";
import NavbarHeader from "./NavbarHeader";
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

function ControlPanel({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  handleCheckBox,
  touched,
  values,
  checked,
  toggle,
  modal,
  controlStatus,
}) {
  return (
    <div className="container-div">
      <div className="controlpanel-page-div">
        <div className="navbar-div">
          <NavbarHeader />
        </div>

        <div className="controlpanel-page-body">
          <motion.div
            className="controlpanel-page-panel container-div-shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="controlpanel-page-panel-title">
              <p>Control Panel</p>
            </div>
            <div className="controlpanel-page-panel-form">
              <Form onSubmit={handleSubmit}>
                <div className="controlpanel-page-panel-form-container">
                  <div className="controlpanel-page-panel-form-item">
                    <FormGroup>
                      <Label className="controlpanel-page-panel-label">
                        First Name
                      </Label>
                      <Input
                        readOnly
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="firstName"
                        className="form-control-controlpanel"
                        type="text"
                        placeholder="Enter your first name"
                      />
                      {touched.firstName && errors.firstName}
                    </FormGroup>
                  </div>
                  <div className="controlpanel-page-panel-form-item">
                    <FormGroup>
                      <Label className="controlpanel-page-panel-label">
                        Last Name
                      </Label>
                      <Input
                        readOnly
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="lastName"
                        className="form-control-controlpanel"
                        type="text"
                        placeholder="Enter your last name"
                      />
                      {touched.lastName && errors.lastName}
                    </FormGroup>
                  </div>
                  <div className="controlpanel-page-panel-form-item">
                    <FormGroup>
                      <Label className="controlpanel-page-panel-label">
                        RFID tag #
                      </Label>
                      <Input
                        value={values.rfid}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="rfid"
                        className="form-control-controlpanel"
                        type="text"
                        placeholder="Enter your RFID tag"
                      />
                      {touched.rfid && errors.rfid}
                    </FormGroup>
                  </div>
                  <div className="controlpanel-page-panel-form-item">
                    <FormGroup>
                      <Label className="controlpanel-page-panel-label">
                        Unique Code
                      </Label>
                      <Input
                        value={values.unicode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="unicode"
                        className="form-control-controlpanel"
                        type="text"
                        placeholder="Enter your unique code"
                      />
                      {touched.unicode && errors.unicode}
                    </FormGroup>
                  </div>
                  <div className="controlpanel-page-panel-form-item">
                    <FormGroup>
                      <Label className="controlpanel-page-panel-label">
                        Email Address
                      </Label>
                      <Input
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="email"
                        className="form-control-controlpanel"
                        type="email"
                        placeholder="Enter your email"
                      />
                      {touched.email && errors.email}
                    </FormGroup>
                  </div>
                  <div className="controlpanel-page-panel-form-item">
                    <FormGroup>
                      <Label className="controlpanel-page-panel-label">
                        Phone Number
                      </Label>
                      <Input
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control-controlpanel"
                        type="text"
                        name="phone"
                        placeholder="Enter your phone number"
                      />
                      {touched.phone && errors.phone}
                    </FormGroup>
                  </div>
                  <FormGroup check>
                    <Label check>
                      <input
                        checked={checked}
                        onChange={handleCheckBox}
                        type="checkbox"
                        name="sms"
                      />{" "}
                      I would like to receive Email notifications.
                    </Label>
                  </FormGroup>
                </div>
                <Button className="controlpanel-page-panel-form-btn">
                  Submit
                </Button>
              </Form>
            </div>
          </motion.div>
          {/* setting the modal in case of success */}
          <Modal className="login-page-modal" isOpen={modal} toggle={toggle}>
            <ModalBody toggle={toggle}>{controlStatus}</ModalBody>
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

export default ControlPanel;
