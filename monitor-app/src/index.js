import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";
import AboutPage from "./AboutPage";
import SignupPage from "./SignupPage";
import FaqPage from "./FaqPage";
import ControlpanelPage from "./ControlpanelPage";
import ContactPage from "./ContactPage";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
// main page that links all pages
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/loginpage" component={LoginPage} />
      <Route path="/aboutpage" component={AboutPage} />
      <Route path="/signuppage" component={SignupPage} />
      <Route path="/faqpage" component={FaqPage} />
      <Route path="/controlpanelpage" component={ControlpanelPage} />
      <Route path="/contactpage" component={ContactPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
