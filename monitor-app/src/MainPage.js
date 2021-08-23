import { Link } from "react-router-dom";
import "./MainPage.css";
import Axios from "axios";
import PageFooter from "./PageFooter";
import NavbarHeader from "./NavbarHeader";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "reactstrap";

const Mainpage = (props) => {
  var user = JSON.parse(localStorage.getItem("currentUser"));
  const [hour, setHour] = useState();
  const [min, setMin] = useState();
  const [entranceStatus, setEntranceStatus] = useState();
  const [newUser, setNewUser] = useState();
  let textStatus;

  const load = () => {
    //if the user is connected
    if (user) {
      //post
      Axios.post("http://localhost:3001/home", {
        username: user.username,
      }).then((response) => {
        //get hour and mins
        setHour(response.data[0].hour);
        setMin(response.data[0].min);
        setEntranceStatus(response.data[0].entranceStatus);
        setNewUser(response.data[0].rfid);
      });
    }
  };
  //add leading zeroes for numbers smaller than 10
  const padLeadingZeros = (num, size) => {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  };
  //get data from the server every 10 secs
  useEffect(() => {
    const updateTimer = setInterval(() => {
      load();
    }, 10000);
    return () => {
      clearInterval(updateTimer);
    };
  }, []); // has no dependency - this will be called on-component-mount

  // stop post
  // left/ entered condition
  if (user) {
    if (newUser === "0") {
      textStatus = (
        <p className="main-page-status-p">
          The student {user.firstName} {user.lastName} has not configured the
          account yet
        </p>
      );
    } else {
      if (entranceStatus === "0") {
        if (hour === "0" && min === "0") {
          textStatus = (
            <p className="main-page-status-p">
              The student {user.firstName} {user.lastName} has not done any
              validations yet.
            </p>
          );
        } else {
          textStatus = (
            <p className="main-page-status-p">
              The student {user.firstName} {user.lastName} has left school at{" "}
              {padLeadingZeros(hour, 2)}:{padLeadingZeros(min, 2)}
            </p>
          );
        }
      }

      if (entranceStatus === "1") {
        textStatus = (
          <p className="main-page-status-p">
            The student {user.firstName} {user.lastName} has entered school at{" "}
            {padLeadingZeros(hour, 2)}:{padLeadingZeros(min, 2)}
          </p>
        );
      }
    }
  }
  return (
    <div className="container-div">
      <div className="main-page-div">
        <div className="navbar-div">
          <NavbarHeader />
        </div>
        <motion.div
          className="main-page-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="main-page-title-full">
            <div className="main-page-title1">
              <p className="main-page-title1-border">School</p>
            </div>
            <div className="main-page-title2">
              <p>Monitoring System</p>
            </div>
          </div>
          <div className="main-page-subtitle">
            <p>Safer environment for your school community</p>
          </div>
          <p className="main-page-paragraph-body">
            Providing a safe, secure learning environment is a challenge for
            every educational facility, but with School monitor system, we offer
            the optimal solution for students, staff, parents and members of the
            school community.
          </p>

          <div className="main-page-btn-div">
            {!localStorage.getItem("currentUser") ? (
              <Link to="/signuppage">
                <Button className="btn-main-page">Sign Up</Button>{" "}
              </Link>
            ) : (
              <div className="main-page-status-div container-div-shadow">
                {textStatus}
              </div>
            )}
          </div>

          <div className="main-page-bottom">
            <p className="main-page-paragraph-bottom">
              <Link to="/aboutpage">
                <a className="main-page-link-bottom" href="url">
                  Access Control
                </a>
              </Link>
            </p>
            <p className="main-page-paragraph-bottom">
              <Link to="/aboutpage">
                <a className="main-page-link-bottom" href="url">
                  Parent Communication
                </a>
              </Link>
            </p>
            <p className="main-page-paragraph-bottom">
              <Link to="/aboutpage">
                <a className="main-page-link-bottom" href="url">
                  Ease of use
                </a>
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
      <PageFooter />
    </div> //container
  );
}; //class

export default Mainpage;
