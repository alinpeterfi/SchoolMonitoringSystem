import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./LoginPage.css";
import { motion } from "framer-motion";
import PageFooter from "./PageFooter";
import NavbarHeader from "./NavbarHeader";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalFooter,
  ModalBody,
} from "reactstrap";
import Axios from "axios";

const Loginpage = (props) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  // post funtion
  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus("You have successfully logged in!");

        //localastoarage setup
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            username: response.data[0].username,
            firstName: response.data[0].firstName,
            lastName: response.data[0].lastName,
            email: response.data[0].email,
            phone: response.data[0].phone,
            rfid: response.data[0].rfid,
            unicode: response.data[0].unicode,
            sms: response.data[0].sms,
          })
        );
        //switch to the main page in 2 secs
        window.setTimeout(function () {
          history.push("/");
        }, 2000);

        //the end
      }
    });
    // show or hide modal
    toggle();
  };

  return (
    <div className="container-div">
      <div className="login-page-div">
        <div className="navbar-div">
          <NavbarHeader />
        </div>

        <div className="login-page-body">
          <motion.div
            className="login-page-panel container-div-shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="login-page-panel-title">
              <p>Login</p>
            </div>
            <div className="login-page-panel-form">
              <Form>
                <FormGroup>
                  <Label for="login-page-panel-username-tag">Username</Label>
                  <Input
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="form-control-login"
                    type="text"
                    id="login-page-panel-username-tag"
                    placeholder="Enter your username"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="login-page-panel-password-tag">Password</Label>
                  <Input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="form-control-login"
                    type="password"
                    id="login-page-panel-password-tag"
                    placeholder="Enter your password"
                  />
                </FormGroup>

                <Button onClick={login} className="login-page-panel-form-btn">
                  Login
                </Button>
              </Form>
            </div>
            <div className="login-page-panel-links">
              <Link to="/Signuppage">
                <a className="login-page-panel-links-item" href="url">
                  Sign Up
                </a>
              </Link>
              <a className="login-page-panel-links-item" href="url">
                Forgot password?
              </a>
            </div>
          </motion.div>
          <Modal className="login-page-modal" isOpen={modal} toggle={toggle}>
            <ModalBody toggle={toggle}>{loginStatus}</ModalBody>
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

export default Loginpage;
