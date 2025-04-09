import React from 'react'
import { Search, User, ShoppingBag, Star, RefreshCcw, ArrowRight, ArrowUp, Twitter, Facebook, Instagram } from 'lucide-react';

function Footer() {
  return (
    <>
    <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Company</p>
              </li>
              <li>
                <p className="footer-list-text">
                  Find a location nearest you. See <a to="#" className="a">Our Stores</a>
                </p>
              </li>
              <li>
                <p className="footer-list-text bold">+391 (0)35 2568 4593</p>
              </li>
              <li>
                <p className="footer-list-text">hello@domain.com</p>
              </li>
            </ul>

            {['Useful as', 'Information'].map((title, index) => (
              <ul key={index} className="footer-list">
                <li>
                  <p className="footer-list-title">{title}</p>
                </li>
                {['New Products', 'Best Sellers', 'Bundle & Save', 'Online Gift Card'].map((item, i) => (
                  <li key={i}>
                    <a to="#" className="footer-a">{item}</a>
                  </li>
                ))}
              </ul>
            ))}

            <div className="footer-list">
              <p className="newsletter-title">Good emails.</p>
              <p className="newsletter-text">
                Enter your email below to be the first to know about new collections and product launches.
              </p>
              <form action="" className="newsletter-form">
                <input type="email" name="email_address" placeholder="Enter your email address" required className="email-field" />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="wrapper">
              <p className="copyright">
                &copy; 2022 codewithsadee
              </p>
              <ul className="social-list">
                {[Twitter, Facebook, Instagram].map((Icon, index) => (
                  <li key={index}>
                    <a to="#" className="social-a">
                      <Icon size={24} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a to="#" className="logo">
              <img src="./assets/images/logo.png" width="179" height="26" loading="lazy" alt="Glowing" />
            </a>
            <img src="./assets/images/pay.png" width="313" height="28" alt="available all payment method" className="w-100" />
          </div>
        </div>
      </footer>
      
    </>
  )
}

export default Footer
