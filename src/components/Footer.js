import React from 'react';
import "../../src/Footer.css"; // Separate CSS file for Footer

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2024 DApp Messaging. All rights reserved.</p>
      <div className="footer-links">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
