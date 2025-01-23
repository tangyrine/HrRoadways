import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/footer.css'; // Import the CSS file

function Footer({ isHindi }) {
  // Example translations for demonstration
  const translations = {
    en: {
      company: "company",
      aboutUs: "About us",
      services: "our services",
      privacy: "privacy policy",
      affiliate: "affiliate program",
      getHelp: "get help",
      faq: "FAQ",
      contactUs: "contact us",
      busStatus: "Bus status",
      paymentOptions: "payment options",
      rides: "Rides",
      trips: "Trips",
      luxury: "Luxury destination",
      visitCities: "Visit cities",
      bestRides: "Best rides",
      followUs: "follow us",
    },
    hi: {
      company: "कंपनी",
      aboutUs: "हमारे बारे में",
      services: "हमारी सेवाएँ",
      privacy: "गोपनीयता नीति",
      affiliate: "सहबद्ध कार्यक्रम",
      getHelp: "सहायता प्राप्त करें",
      faq: "सामान्य प्रश्न",
      contactUs: "संपर्क करें",
      busStatus: "बस स्थिति",
      paymentOptions: "भुगतान विकल्प",
      rides: "सवारी",
      trips: "यात्राएँ",
      luxury: "लग्जरी गंतव्य",
      visitCities: "शहरों की यात्रा करें",
      bestRides: "सर्वश्रेष्ठ सवारी",
      followUs: "हमें फॉलो करें",
    },
  };

  // Decide which language to use
  const t = isHindi ? translations.hi : translations.en;

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>{t.company}</h4>
              <ul>
                <li><Link to="/about">{t.aboutUs}</Link></li>
                <li><Link to="/under-construction">{t.services}</Link></li>
                <li><Link to="/policy">{t.privacy}</Link></li>
                <li><Link to="/affiliate">{t.affiliate}</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.getHelp}</h4>
              <ul>
                <li><Link to="/faq">{t.faq}</Link></li>
                <li><Link to="/under-construction">{t.contactUs}</Link></li>
                <li><Link to="/track">{t.busStatus}</Link></li>
                <li><Link to="/under-construction">{t.paymentOptions}</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.rides}</h4>
              <ul>
                <li><Link to="/trip">{t.trips}</Link></li>
                <li><Link to="/under-construction">{t.luxury}</Link></li>
                <li><Link to="/travellocations">{t.visitCities}</Link></li>
                <li><Link to="/under-construction">{t.bestRides}</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.followUs}</h4>
              <div className="social-links">
                <a href="https://github.com/NishantRana07"><i className="fab fa-facebook-f"></i></a>
                <a href="https://github.com/NishantRana07/"><i className="fab fa-x-twitter"></i></a>
                <a href="https://github.com/NishantRana07/"><i className="fab fa-instagram"></i></a>
                <a href="https://github.com/NishantRana07/"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
