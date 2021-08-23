import "./AboutPage.css";
import PageFooter from "./PageFooter";
import NavbarHeader from "./NavbarHeader";
import React from "react";
import { motion } from "framer-motion";

const Aboutpage = (props) => {
  return (
    <div className="container-div">
      <div className="about-page-div">
        <div className="navbar-div">
          <NavbarHeader />
        </div>

        <motion.div
          className="about-page-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="about-page-title-div">
            <p className="about-page-title">School Monitor System</p>
          </div>
          <p className="about-page-text">
            When it comes to school security, today’s challenges range from gun
            violence and vandalism to theft and the spread of germs. Mitigating
            these risks and improving health, safety and security in school
            facilities requires a comprehensive approach to on-site security. It
            is important to have easy-to-manage advanced school security
            solutions in place when it comes to school safety and that’s exactly
            what we can offer you.
          </p>
        </motion.div>

        <motion.div className="about-page-motion-div">
          <motion.div
            className="about-page-motion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.2 }}
          >
            <motion.p className="about-page-motion-title">
              Access Control
            </motion.p>
            <motion.p className="about-page-motion-content">
              An electronic access control system that allows you to control,
              record all school gate access requests and also offers remote
              lock/unlock capabilities.
            </motion.p>
          </motion.div>
          <motion.div
            className="about-page-motion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.6 }}
          >
            <motion.p className="about-page-motion-title">
              Parent Communication
            </motion.p>
            <motion.p className="about-page-motion-content">
              Instant activity (enter/exit) communication report via email
              according to the parent selected option.
            </motion.p>
          </motion.div>
          <motion.div
            className="about-page-motion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1 }}
          >
            <motion.p className="about-page-motion-title">Ease of use</motion.p>
            <motion.p className="about-page-motion-content">
              Fast and indicative sign-up process along with an accessible
              user-friendly control panel.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      <PageFooter />
    </div> //container div
  );
};

export default Aboutpage;
