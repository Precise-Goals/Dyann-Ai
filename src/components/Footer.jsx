import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <h3>Dyann AI</h3>
            <p>Simplify sales data analysis with AI assistance</p>
          </div>
        </div>

        <div className="footer-section">
          <div className="footer-social">
            <h4>Connect with us</h4>
            <div className="social-icons">
              <a href="#" className="social-link">
                <Github size={20} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link">
                <Linkedin size={20} />
              </a>
              <a href="#" className="social-link">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/dyann">Dyann</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/assistant">Assistant</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Crossconnectors. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
