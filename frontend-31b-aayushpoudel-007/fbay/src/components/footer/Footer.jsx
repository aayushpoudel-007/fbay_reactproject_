// Footer.js

import React from "react";
import "./Footer.css"; // Import your CSS file for styling

const Footer = () => {
  const handleContactClick = () => {
    const recipientEmail = "aayushp2906@gmail.com";
    const subject = "Inquiry from Your Website"; // You can customize the subject
    const body = "Hello,\n\nI would like to inquire about...";
    
    // Construct the mailto URL
    const mailtoURL = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the default email client
    window.location.href = mailtoURL;
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About us</h3>
          <p>Email: aayushp2906@gmail.com</p>
          <p>Phone: 9840XXXXXX</p>
        </div>

        <div className="footer-section">
          <h3>Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact" onClick={handleContactClick}>Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Social Media</h3>
          <p>Follow us on:</p>
          <div className="social-icons">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 fBay. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
