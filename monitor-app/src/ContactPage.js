import React, { useState } from "react";
import "./ContactPage.css";
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
import emailjs from "emailjs-com";

const Contactpage = (props) => {
  const [contactStatus, setContactStatus] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  function sendEmail(e) {
    e.preventDefault();
    //in case of success, we enable the state
    setContactStatus("You have successfully sent the message!");

    emailjs.sendForm(
      "gmail",
      "template_hs7myz7",
      e.target,
      "user_jXZ4R4cSDXBCix3xBbR4g"
    );
    toggle();
    e.target.reset();
  }

  return (
    <div className="container-div">
      <div className="contact-page-div">
        <div className="navbar-div">
          <NavbarHeader />
        </div>

        <div className="contact-page-body">
          <motion.div
            className="contact-page-panel container-div-shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="contact-page-panel-title">
              <p>Send a direct message</p>
            </div>
            <div className="contact-page-panel-form">
              <Form onSubmit={sendEmail}>
                <FormGroup>
                  <div className="contact-page-panel-header">
                    <Label className="contact-page-header-tag">
                      Please fill this form in a decent manner
                    </Label>
                  </div>
                  <Label for="contact-page-panel-username-tag">Full Name</Label>
                  <Input
                    className="form-control-contact"
                    type="text"
                    name="contactFullName"
                    placeholder="Enter your name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="contact-page-panel-password-tag">Subject</Label>
                  <Input
                    className="form-control-contact"
                    type="text"
                    name="contactSubject"
                    placeholder="Enter your subject"
                  />
                </FormGroup>{" "}
                <FormGroup>
                  <Label for="contact-page-panel-textarea-tag">Message</Label>
                  <Input
                    className="form-control-contact"
                    type="textarea"
                    name="contactMessage"
                    placeholder="Content..."
                  />
                </FormGroup>
                <Button className="contact-page-panel-form-btn">Submit</Button>
              </Form>
            </div>
          </motion.div>
          {/* setting the modal in case of success */}
          <Modal className="login-page-modal" isOpen={modal} toggle={toggle}>
            <ModalBody toggle={toggle}>{contactStatus}</ModalBody>
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
}; //class

export default Contactpage;
