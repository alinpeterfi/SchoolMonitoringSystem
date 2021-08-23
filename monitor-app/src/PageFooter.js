import twitterImg from "./twitter.png";
import instaImg from "./insta.png";
import fbImg from "./fb.png";
import questionImg from "./question.png";
import phoneImg from "./phone.png";
import { Media } from "reactstrap";
import React from "react";
var footerStyle = {
  minWidth: 16,
};

const PageFooter = (props) => {
  return (
    <footer className="page-footer">
      <div className="page-footer-left">
        <div className="page-footer-left-item">
          <Media>
            <Media
              className="img-page-footer"
              style={footerStyle}
              object
              src={questionImg}
              alt="icon"
            />
          </Media>
        </div>
        <div className="page-footer-left-item">
          <a className="page-footer-text" href="/faqpage">
            Need Help?
          </a>
        </div>
        <div className="page-footer-left-item">
          <Media>
            <Media
              className="img-page-footer"
              style={footerStyle}
              object
              src={phoneImg}
              alt="icon"
            />
          </Media>
        </div>
        <div className="page-footer-left-item">
          <a className="page-footer-text" href="/contactpage">
            Contact Us!
          </a>
        </div>
      </div>

      <div className="page-footer-right">
        <div className="page-footer-right-item">
          <Media>
            <Media
              className="img-page-footer"
              style={footerStyle}
              object
              src={instaImg}
              alt="icon"
            />
          </Media>
        </div>
        <div className="page-footer-right-item">
          <Media>
            <Media
              className="img-page-footer"
              style={footerStyle}
              object
              src={twitterImg}
              alt="icon"
            />
          </Media>
        </div>
        <div className="page-footer-right-item">
          <Media>
            <Media
              className="img-page-footer"
              style={footerStyle}
              object
              src={fbImg}
              alt="icon"
            />
          </Media>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
