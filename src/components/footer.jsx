import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import '../styles/footer.css'; // Import the CSS file

function Footer({ isHindi }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  const translations = {
    en: {
      company: "Company",
      aboutUs: "About us",
      services: "Our Services",
      privacy: "Policy",
      affiliate: "Affiliate Program",
      getHelp: "Help",
      faq: "FAQ",
      contactUs: "Contact Us",
      busStatus: "Bus Status",
      paymentOptions: "Payment Options",
      rides: "Rides",
      trips: "Trips",
      luxury: "Luxury Destination",
      visitCities: "Visit Cities",
      bestRides: "Best Rides",
      followUs: "Follow Us",
    },
    hi: {
      company: "कंपनी",
      aboutUs: "हमारे बारे में",
      services: "हमारी सेवाएँ",
      privacy: "नीति",
      affiliate: "संबद्ध कार्यक्रम",
      getHelp: "मदद",
      faq: "सामान्य प्रश्न",
      contactUs: "संपर्क करें",
      busStatus: "बस की स्थिति",
      paymentOptions: "भुगतान विकल्प",
      rides: "सवारी",
      trips: "यात्राएँ",
      luxury: "लक्जरी गंतव्य",
      visitCities: "शहरों का दौरा करें",
      bestRides: "सर्वश्रेष्ठ सवारी",
      followUs: "हमें फॉलो करें",
    },
  };

  const t = isHindi ? translations.hi : translations.en;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>{t.company}</h4>
          <ul>
            <li><Link to="/about">{t.aboutUs}</Link></li>
            <li><Link to="/services">{t.services}</Link></li>
            <li><Link to="/privacy">{t.privacy}</Link></li>
            <li><Link to="/affiliate">{t.affiliate}</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>{t.getHelp}</h4>
          <ul>
            <li><Link to="/faq">{t.faq}</Link></li>
            <li><Link to="/contact">{t.contactUs}</Link></li>
            <li><Link to="/bus-status">{t.busStatus}</Link></li>
            <li><Link to="/payment-options">{t.paymentOptions}</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>{t.rides}</h4>
          <ul>
            <li><Link to="/trips">{t.trips}</Link></li>
            <li><Link to="/luxury">{t.luxury}</Link></li>
            <li><Link to="/visit-cities">{t.visitCities}</Link></li>
            <li><Link to="/best-rides">{t.bestRides}</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>{t.followUs}</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SpendWise. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;