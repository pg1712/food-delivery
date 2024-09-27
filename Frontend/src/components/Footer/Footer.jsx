import React from "react";
import "./footer.css";

import { assets } from "../../assets/assets.js";
function Footer() {
    return (
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>dummy data</p>
                    <div className="footer-social-icon">
                        <img src={assets.facebook_icon} alt="facebook-icon" />
                        <img src={assets.linkedin_icon} alt="linkedin_icon" />
                        <img src={assets.twitter_icon} />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Company</h2>
                    <ul>
                        <li>home</li>
                        <li>about us</li>
                        <li>contact</li>
                        <li>privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Get in Touch</h2>
                    <ul>
                        <li>+1+322323444</li>
                        <li>foodie@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className="footer-copyright">
                Copyright 2024 &copy; Tomato.com All rights reserved
            </div>
        </div>
    );
}

export default Footer;
