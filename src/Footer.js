import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-details">
          <h3>Contact Us</h3>
          <p>Email: example@example.com</p>
          <p>Phone: +1234567890</p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>
        <div className="social-links">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2024 Your Blog Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
