import React from "react";
import "./FaqPage.css";
import PageFooter from "./PageFooter";
import NavbarHeader from "./NavbarHeader";
import { motion } from "framer-motion";
import { Card, CardBody, UncontrolledCollapse } from "reactstrap";

const Faqpage = (props) => {
  return (
    <div className="container-div">
      <div className="faq-page-div">
        <div className="navbar-div">
          <NavbarHeader />
        </div>

        <div className="faq-page-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="faq-page-question"
          >
            <a className="faq-page-question-title" id="toggler1">
              How can I get more information about the School Monitoring System?
            </a>
            <UncontrolledCollapse toggler="#toggler1">
              <Card>
                <CardBody className="faq-page-collapse">
                  To get more information regarding the School Monitor System,
                  you can leave a message using the Contact Page.
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="faq-page-question"
          >
            <a className="faq-page-question-title" id="toggler2">
              How will the School Monitor System help me?
            </a>
            <UncontrolledCollapse toggler="#toggler2">
              <Card>
                <CardBody className="faq-page-collapse">
                  Teachers would spend their time to teaching, and students
                  would devote their time to learning in an ideal world.
                  However, because today's world isn't perfect in many ways,
                  such as vandalism, robbery, and the spread of germs,
                  installing a security system reduces those hazards.
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="faq-page-question"
          >
            <a className="faq-page-question-title" id="toggler3">
              How can I change personal data information?
            </a>
            <UncontrolledCollapse toggler="#toggler3">
              <Card>
                <CardBody className="faq-page-collapse">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="faq-page-question"
          >
            <a className="faq-page-question-title" id="toggler4">
              How long does it take to get the validation email?
            </a>
            <UncontrolledCollapse toggler="#toggler4">
              <Card>
                <CardBody className="faq-page-collapse">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </motion.div>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}; //class

export default Faqpage;
