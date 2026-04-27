import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p className="footer-brand-text">
              A space for thinkers, writers, and curious minds. Share your ideas with the world through beautifully crafted posts.
            </p>
          </div>
          <div>
            <h3 className="footer-col-title">Company</h3>
            <ul className="footer-links">
              <li><Link to="/">Features</Link></li>
              <li><Link to="/">Pricing</Link></li>
              <li><Link to="/">Affiliate Program</Link></li>
              <li><Link to="/">Press Kit</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-col-title">Support</h3>
            <ul className="footer-links">
              <li><Link to="/">Account</Link></li>
              <li><Link to="/">Help</Link></li>
              <li><Link to="/">Contact Us</Link></li>
              <li><Link to="/">Customer Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-col-title">Legal</h3>
            <ul className="footer-links">
              <li><Link to="/">Terms & Conditions</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Licensing</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} BlogNest. All rights reserved.</span>
          <span>Built with ❤️ and Appwrite</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
