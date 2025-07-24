import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { getStoredLanguage, setStoredLanguage } from '../../libs/languageStorage';

const Logo = 'https://i.ibb.co/kg3RQQ1S/LogoHR.png';

const Navigation = ({ isHindi, onToggleLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(servicesTimer.current);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    servicesTimer.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  useEffect(() => {
    setStoredLanguage(isHindi ? 'hi' : 'en');
  }, [isHindi]);

  const translations = {
    en: {
      home: "Home",
      contact: "Contact",
      donate: "Donate",
      about: "About Us",
      trip: "Plan Journey",
      services: "Services",
      track: "Track Bus",
      schedule: "Time Table",
      tourGuide: "Tour Guide",
      helpline: "24x7 Helpline",
      blog: "Blog",
      quickLinks: "Quick Links",
      travellocations: "Travel",
      guide: "Guide and Rules",
    },
    hi: {
      home: "मुख्य पृष्ठ",
      contact: "संपर्क करें",
      donate: "दान करें",
      about: "हमारे बारे में",
      trip: "यात्रा योजना",
      services: "सेवाएं",
      track: "बस ट्रैक करें",
      schedule: "समय सारणी",
      tourGuide: "मार्गदर्शिका",
      helpline: "24x7 हेल्पलाइन",
      blog: "ब्लॉग",
      quickLinks: "त्वरित लिंक",
      travellocations: "यात्रा",
      guide: "मार्गदर्शिका और नियम",
    },
  };

  const currentLanguage = isHindi ? translations.hi : translations.en;

  const servicesDropdown = [
    { title: currentLanguage.track, path: '/track' },
    { title: currentLanguage.schedule, path: '/schedule' },
    { title: currentLanguage.tourGuide, path: '/tour-guide' },
  ];

  const toggleSidebar = () => setIsMobileMenuOpen(x => !x);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              1800-180-2345
            </span>
            <Link to="/rules" className="hover:underline">
              {currentLanguage.guide}
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="lang flex items-center">
              EN
              <div className="checkbox-wrapper-5 ml-2 mr-2">
                <div className="check">
                  <input
                    id="check-5"
                    type="checkbox"
                    checked={isHindi}
                    onChange={onToggleLanguage}
                    className="sr-only"
                  />
                  <label htmlFor="check-5" className="toggle-label"></label>
                </div>
              </div>
              HI
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`sticky top-0 z-50 w-full ${isScrolled ? 'shadow-lg bg-white dark:bg-gray-800' : 'bg-white/95 dark:bg-gray-900'} transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img src={Logo} alt="Haryana Roadways Logo" className="w-8 h-8" />
              <span className="font-bold text-xl text-blue-900 dark:text-white">
                Haryana Roadways
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">
                {currentLanguage.home}
              </Link>

              <div
                className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center dark:text-gray-300 dark:hover:text-blue-400">
                  {currentLanguage.services}
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''} dark:text-gray-300`} />
                </button>

                <div className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ${isServicesOpen ? 'block' : 'hidden'} dark:bg-gray-700 dark:shadow-xl`}>
                  {servicesDropdown.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-600"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/trip" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">
                {currentLanguage.trip}
              </Link>
              <Link to="/travellocations" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">
                {currentLanguage.travellocations}
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">
                {currentLanguage.about}
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">
                {currentLanguage.blog}
              </Link>
              <Link to="/donate" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">
                {currentLanguage.donate}
              </Link>
              <Link to="/helpline" className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center text-base font-semibold ml-4 dark:bg-blue-600 dark:hover:bg-blue-500">
                <Phone className="w-4 h-4 mr-1" />
                {currentLanguage.helpline}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-blue-900 focus:outline-none dark:text-white" onClick={toggleSidebar} aria-label="Toggle menu">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 md:hidden dark:bg-gray-800 dark:shadow-xl`}>
        <div className="p-4">
          <ul className="space-y-4">
            <li>
              <Link to="/" onClick={toggleSidebar} className="block py-2 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
                {currentLanguage.home}
              </Link>
            </li>
            <li className="relative">
              <button onClick={() => setIsServicesOpen(!isServicesOpen)} className="block py-2 hover:text-blue-600 flex items-center justify-between w-full dark:text-gray-200 dark:hover:text-blue-400">
                {currentLanguage.services}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''} dark:text-gray-200`} />
              </button>
              {isServicesOpen && (
                <ul className="ml-4 mt-1 space-y-2">
                  {servicesDropdown.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        to={item.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-600"
                        onClick={toggleSidebar}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li><Link to="/trip" onClick={toggleSidebar} className="block py-2 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">{currentLanguage.trip}</Link></li>
            <li><Link to="/travellocations" onClick={toggleSidebar} className="block py-2 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">{currentLanguage.travellocations}</Link></li>
            <li><Link to="/about" onClick={toggleSidebar} className="block py-2 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">{currentLanguage.about}</Link></li>
            <li><Link to="/blog" onClick={toggleSidebar} className="block py-2 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">{currentLanguage.blog}</Link></li>
            <li><Link to="/donate" onClick={toggleSidebar} className="block py-2 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">{currentLanguage.donate}</Link></li>
            <li><Link to="/helpline" onClick={toggleSidebar} className="block py-2 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">{currentLanguage.helpline}</Link></li>
            <li className="flex items-center justify-between py-2 dark:text-gray-200">
              <span>EN</span>
              <div className="checkbox-wrapper-5">
                <div className="check">
                  <input
                    id="mobile-check-5"
                    type="checkbox"
                    checked={isHindi}
                    onChange={onToggleLanguage}
                    className="sr-only"
                  />
                  <label htmlFor="mobile-check-5" className="toggle-label"></label>
                </div>
              </div>
              <span>HI</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navigation;
