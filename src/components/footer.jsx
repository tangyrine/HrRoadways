import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bus, MapPin, Clock, Globe, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

function Footer({ isHindi }) {
  const [currentTime, setCurrentTime] = useState(new Date());

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

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  const t = isHindi ? translations.hi : translations.en;

  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-700 to-indigo-700 animate-pulse"></div>
      </div>

      <div className="absolute top-2 right-4 text-right z-10">
        <div className="flex items-center gap-2 text-sm bg-white/10 rounded-full px-4 py-1 backdrop-blur-sm">
          <Globe className="w-4 h-4 text-blue-300 animate-spin-slow" />
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Bus className="w-8 h-8 text-blue-300 animate-bounce" />
            <h2 className="text-2xl font-bold text-white">Haryana Roadways</h2>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <Clock className="w-4 h-4" />
            <span>{currentTime.toLocaleDateString()}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            {
              title: t.company,
              icon: MapPin,
              links: [
                { label: t.aboutUs, to: "/about" },
                { label: t.services, to: "/under-construction" },
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
                { label: t.paymentOptions, to: "/under-construction" },
              ],
            },
            {
              title: t.rides,
              icon: Globe,
              links: [
                { label: t.trips, to: "/trip" },
                { label: t.luxury, to: "/under-construction" },
                { label: t.visitCities, to: "/travellocations" },
                { label: t.bestRides, to: "/under-construction" },
              ],
            },
            {
              title: t.followUs,
              icon: Linkedin,
              links: [],
            },
          ].map((section, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-3 mb-2 border-b pb-1 border-blue-700">
                <section.icon className="w-5 h-5 text-blue-300" />
                <h4 className="text-lg font-bold text-white">{section.title}</h4>
              </div>
              {section.links.length > 0 ? (
                <ul className="space-y-1">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.to}
                        className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="social-links flex gap-4 justify-center">
                  {[
                    { Icon: Facebook, color: "text-blue-400", href: "https://github.com/NishantRana07" },
                    { Icon: Twitter, color: "text-sky-400", href: "https://github.com/NishantRana07/" },
                    { Icon: Instagram, color: "text-blue-500", href: "https://github.com/NishantRana07/" },
                    { Icon: Linkedin, color: "text-blue-600", href: "https://github.com/NishantRana07/" },
                  ].map(({ Icon, color, href }, idx) => (
                    <a
                      key={idx}
                      href={href}
                      className="hover:scale-110 transition-transform duration-300 hover:rotate-6"
                    >
                      <Icon className={`w-6 h-6 ${color} hover:opacity-70`} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-3 border-t border-blue-700 text-center">
          <div className="flex justify-center items-center gap-2">
            <Bus className="w-6 h-6 text-blue-300 animate-pulse" />
            <p className="text-xs text-white/70">© {new Date().getFullYear()} Haryana Roadways - Connecting Communities</p>
            <Bus className="w-6 h-6 text-blue-300 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
