import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Globe2, Bus, Search } from 'lucide-react';

const Navigation = ({ isHindi, onToggleLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

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
      pass: "Bus Pass",
      helpline: "24x7 Helpline",
      search: "Search Routes",
      quickLinks: "Quick Links"
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
      pass: "बस पास",
      helpline: "24x7 हेल्पलाइन",
      search: "मार्ग खोजें",
      quickLinks: "त्वरित लिंक"
    }
  };

  const currentLanguage = isHindi ? translations.hi : translations.en;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesDropdown = [
    { title: currentLanguage.track, path: '/track' },
    { title: currentLanguage.schedule, path: '/schedule' },
    { title: currentLanguage.pass, path: '/pass' }
  ];

  return (
    <>
      <div className="bg-blue-900 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              1800-180-2345
            </span>
            <button className="flex items-center hover:text-blue-200">
              <Search className="w-4 h-4 mr-1" />
              {currentLanguage.search}
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hover:text-blue-200">{currentLanguage.quickLinks}</button>
            <span className="text-blue-300">|</span>
            <div className="flex items-center space-x-2">
              <span className={isHindi ? 'opacity-50' : 'opacity-100'}>EN</span>
              <div className="relative inline-block w-10 h-5">
                <input
                  type="checkbox"
                  checked={isHindi}
                  onChange={onToggleLanguage}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-blue-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
              </div>
              <span className={isHindi ? 'opacity-100' : 'opacity-50'}>HI</span>
            </div>
          </div>
        </div>
      </div>

      <nav className={`sticky top-0 z-50 w-full ${isScrolled ? 'shadow-lg bg-white' : 'bg-white/95'} transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Bus className="w-8 h-8 text-blue-800" />
              <span className="font-bold text-xl text-blue-900">Haryana Roadways</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="nav-link">{currentLanguage.home}</Link>
              
              <div className="relative group">
                <button 
                  className="nav-link flex items-center"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  {currentLanguage.services}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {isServicesOpen && (
                  <div 
                    className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 mt-1"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    {servicesDropdown.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/trip" className="nav-link">{currentLanguage.trip}</Link>
              <Link to="/about" className="nav-link">{currentLanguage.about}</Link>
              <Link to="/contact" className="nav-link">{currentLanguage.contact}</Link>
              
              <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {currentLanguage.helpline}
              </button>
            </div>

            <button 
              className="md:hidden text-blue-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link to="/" className="block py-2">{currentLanguage.home}</Link>
              <div className="border-t pt-2">
                <div className="font-medium mb-2">{currentLanguage.services}</div>
                {servicesDropdown.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="block py-2 pl-4 text-gray-600"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <Link to="/trip" className="block py-2">{currentLanguage.trip}</Link>
              <Link to="/about" className="block py-2">{currentLanguage.about}</Link>
              <Link to="/contact" className="block py-2">{currentLanguage.contact}</Link>
              
              <div className="flex items-center space-x-2 py-2 border-t">
                <span>EN</span>
                <div className="relative inline-block w-10 h-5">
                  <input
                    type="checkbox"
                    checked={isHindi}
                    onChange={onToggleLanguage}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-blue-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                </div>
                <span>HI</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        .nav-link {
          position: relative;
          color: #1e3a8a;
          font-weight: 500;
          transition: color 0.2s;
        }
        
        .nav-link:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: #1e3a8a;
          transform: scaleX(0);
          transition: transform 0.2s;
        }
        
        .nav-link:hover {
          color: #1e40af;
        }
        
        .nav-link:hover:after {
          transform: scaleX(1);
        }
      `}</style>
    </>
  );
};

export default Navigation;
