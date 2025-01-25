import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bus, MapPin, Clock, Globe, Facebook, Twitter, Instagram, Linkedin, Share } from 'lucide-react';
import '../assets/footer.css'; // Import the CSS file

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

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  const t = isHindi ? translations.hi : translations.en;

  return (
    <footer className="footer">
      <div className="footer-bg-overlay" />
      <div className="footer-time">
        <div className="footer-time-content">
          <Globe className="footer-time-icon" />
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
        <div className="footer-date-content">
          <Clock className="footer-date-icon" />
          <span>{currentTime.toLocaleDateString()}</span>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer-header">
          <div className="footer-logo">
            <Bus className="footer-logo-icon" />
            <h2 className="footer-title">Haryana Roadways</h2>
          </div>
        </div>

        <div className="footer-sections">
          {[
            {
              title: t.company,
              icon: MapPin,
              links: [
                { label: t.aboutUs, to: "/about" },
                { label: t.services, to: "/services" },
                { label: t.privacy, to: "/policy" },
                { label: t.affiliate, to: "/affiliate" },
              ],
            },
            {
              title: t.getHelp,
              icon: Bus,
              links: [
                { label: t.faq, to: "/faq" },
                { label: t.contactUs, to: "/contact" },
                { label: t.busStatus, to: "/track" },
                { label: t.paymentOptions, to: "/payment" },
              ],
            },
            {
              title: t.rides,
              icon: Globe,
              links: [
                { label: t.trips, to: "/trip" },
                { label: t.luxury, to: "/luxury" },
                { label: t.visitCities, to: "/travellocations" },
                { label: t.bestRides, to: "/under-construction" },
              ],
            },
            {
              title: t.followUs,
              icon: Share,
              links: [],
            },
          ].map((section, index) => (
            <div key={index} className="footer-section">
              <div className="footer-section-header">
                <section.icon className="footer-section-icon" />
                <h4 className="footer-section-title">{section.title}</h4>
              </div>
              {section.links.length > 0 ? (
                <ul className="footer-links">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link to={link.to} className="footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="footer-social-links">
                  {[
                    { Icon: Facebook, color: "social-facebook", href: "https://github.com/NishantRana07" },
                    { Icon: Twitter, color: "social-twitter", href: "https://github.com/NishantRana07/" },
                    { Icon: Instagram, color: "social-instagram", href: "https://github.com/NishantRana07/" },
                    { Icon: Linkedin, color: "social-linkedin", href: "https://github.com/NishantRana07/" },
                  ].map(({ Icon, color, href }, idx) => (
                    <a key={idx} href={href} className="footer-social-link">
                      <Icon className={`footer-social-icon ${color}`} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <Bus className="footer-bottom-icon" />
            <p className="footer-bottom-text">© {new Date().getFullYear()} Haryana Roadways - Connecting Communities</p>
            <Bus className="footer-bottom-icon" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;