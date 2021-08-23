import {
  DropdownMenu,
  Navbar,
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  NavLink,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const NavbarHeader = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  var user = JSON.parse(localStorage.getItem("currentUser"));
  const history = useHistory();

  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const [logoutStatus, setLogoutStatus] = useState("");
  //in case of logout
  const logOut = () => {
    localStorage.clear();
    setLogoutStatus("You have successfully logged out!");
    toggleModal();
    window.setTimeout(function () {
      history.push("/");
    }, 2000);
  };
  return (
    <div>
      <Navbar expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {/* display tabs based on user connected or not */}
            {!localStorage.getItem("currentUser") ? (
              <>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <Link to="/aboutpage">
                    <NavLink href="/components/">About</NavLink>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link to="/faqpage">
                    <NavLink href="/components/">FAQ</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/contactpage">
                    <NavLink href="/components/">Contact</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/loginpage">
                    <NavLink href="/components/">Login</NavLink>
                  </Link>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <Link to="/aboutpage">
                    <NavLink href="/components/">About</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/controlpanelpage">
                    <NavLink href="/components/">Control Panel</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/faqpage">
                    <NavLink href="/components/">FAQ</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/contactpage">
                    <NavLink href="/components/">Contact</NavLink>
                  </Link>
                </NavItem>

                {/* here we add the dropdown logout */}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {user.username}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={logOut}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <Modal className="login-page-modal" isOpen={modal} toggle={toggleModal}>
        <ModalBody toggle={toggleModal}>{logoutStatus}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default NavbarHeader;
