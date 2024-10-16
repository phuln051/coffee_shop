// components/Footer.js
import React from 'react';
import './Footer.css'; // CSS cho footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
