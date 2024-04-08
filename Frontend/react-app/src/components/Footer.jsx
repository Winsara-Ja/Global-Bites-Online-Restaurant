import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <foot>
        <footer class="footer">
          <div class="footer__addr">
            <h1 class="footer__logo">Global Bites</h1>
            <div className="footer-row">
              <div>
                Contact
                <br />
                +94 76 472 81 01
                <br />
                <br />
                5534 Somewhere In. The World 22193-10212
                <br />
                <a class="footer__btn" href="mailto:example@gmail.com">
                  Email Us
                </a>
              </div>
              <div className="list-items3">
                <li className="list-item1">Home</li>
                <li className="list-item1">Feedback</li>
                <li className="list-item1">Offers</li>
                <li className="list-item1">Awards</li>
              </div>
              <div className="list-items2">
                <li className="list-item1">Terms</li>
                <li className="list-item1">Privacy</li>
                <li className="list-item1">Support</li>
                <li className="list-item1">About</li>
              </div>
            </div>
            <div class="legal">
              <p>
                &copy; 2024 Something. All rights reserved. Global Bites &copy;
              </p>
            </div>
          </div>
        </footer>
      </foot>
    </>
  );
};

export default Footer;
