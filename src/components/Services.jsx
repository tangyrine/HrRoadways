import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bus, Shield, CreditCard, MapPin, Wifi, 
  CheckCircle, Headphones, TrendingUp, 
  Clock, Smartphone, AlertTriangle 
} from 'lucide-react';
import '../styles/OurServices.css';

const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isIntersecting;
};

const ServiceCard = ({ icon: Icon, title, description, color }) => {
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 50 
      }}
      transition={{ duration: 0.5 }}
      className="service-card group"
    >
      <div className={`service-icon bg-${color}-100 text-${color}-600`}>
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
      <div className="service-hover-effect">
        <span className="hover-text">Learn More</span>
      </div>
    </motion.div>
  );
};

const ServiceCategories = ({ isHindi }) => {
  const translations = {
    en: {
      passenger: {
        title: 'Passenger Services',
        services: [
          { title: 'Comfortable Buses', description: 'AC and Non-AC options with premium seating' },
          { title: 'Luggage Facility', description: 'Safe and secure luggage storage' },
          { title: 'Ticket Booking', description: 'Online and offline booking options' }
        ]
      },
      digital: {
        title: 'Digital Services',
        services: [
          { title: 'Mobile App', description: 'Real-time tracking and booking' },
          { title: 'Online Payment', description: 'Secure digital payment methods' },
          { title: 'E-Ticket', description: 'Instant digital ticket generation' }
        ]
      },
      safety: {
        title: 'Safety Services',
        services: [
          { title: 'GPS Tracking', description: 'Real-time bus location tracking' },
          { title: 'Emergency Support', description: '24/7 customer assistance' },
          { title: 'Clean Travel', description: 'Sanitized buses and safety protocols' }
        ]
      }
    },
    hi: {
      passenger: {
        title: 'यात्री सेवाएं',
        services: [
          { title: 'आरामदायक बसें', description: 'एसी और गैर-एसी विकल्प प्रीमियम सीटिंग के साथ' },
          { title: 'सामान सुविधा', description: 'सुरक्षित और सुरक्षित सामान भंडारण' },
          { title: 'टिकट बुकिंग', description: 'ऑनलाइन और ऑफलाइन बुकिंग विकल्प' }
        ]
      },
      digital: {
        title: 'डिजिटल सेवाएं',
        services: [
          { title: 'मोबाइल ऐप', description: 'वास्तविक समय ट्रैकिंग और बुकिंग' },
          { title: 'ऑनलाइन भुगतान', description: 'सुरक्षित डिजिटल भुगतान विधियां' },
          { title: 'ई-टिकट', description: 'तत्काल डिजिटल टिकट जनरेशन' }
        ]
      },
      safety: {
        title: 'सुरक्षा सेवाएं',
        services: [
          { title: 'जीपीएस ट्रैकिंग', description: 'वास्तविक समय बस स्थान ट्रैकिंग' },
          { title: 'आपातकालीन सहायता', description: '24/7 ग्राहक सहायता' },
          { title: 'स्वच्छ यात्रा', description: 'सैनिटाइज्ड बसें और सुरक्षा प्रोटोकॉल' }
        ]
      }
    }
  };

  const currentLanguage = isHindi ? translations.hi : translations.en;

  const [activeCategory, setActiveCategory] = useState('passenger');
  const categories = [
    { id: 'passenger', icon: Bus, title: currentLanguage.passenger.title, services: currentLanguage.passenger.services },
    { id: 'digital', icon: Smartphone, title: currentLanguage.digital.title, services: currentLanguage.digital.services },
    { id: 'safety', icon: Shield, title: currentLanguage.safety.title, services: currentLanguage.safety.services }
  ];

  return (
    <div className="service-categories-container">
      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
          >
            <category.icon className="tab-icon" />
            {category.title}
          </button>
        ))}
      </div>
      <div className="category-content">
        <AnimatePresence mode="wait">
          {categories.map((category) => (
            activeCategory === category.id && (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="category-services"
              >
                {category.services.map((service, index) => (
                  <div key={index} className="category-service-item">
                    <CheckCircle className="service-check-icon" />
                    <div>
                      <h4 className="service-item-title">{service.title}</h4>
                      <p className="service-item-description">{service.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ServicesPage = ({ isHindi }) => {
  const translations = {
    en: {
      title: "Haryana Roadways Services",
      subtitle: "Connecting Communities, Delivering Comfort",
      keyServices: [
        { icon: Bus, title: 'Extensive Network', description: 'Connecting 120+ districts with 2500+ buses', color: 'blue' },
        { icon: CreditCard, title: 'Multiple Payment', description: 'Convenient digital and cash payment options', color: 'green' },
        { icon: Wifi, title: 'Connected Journey', description: 'Free Wi-Fi in select premium buses', color: 'purple' },
        { icon: MapPin, title: 'Route Flexibility', description: 'Comprehensive route network across Haryana', color: 'orange' }
      ],
      additionalSupport: "Additional Support",
      additionalServices: [
        { icon: Headphones, title: '24/7 Customer Support', description: 'Always available to assist you' },
        { icon: AlertTriangle, title: 'Real-time Alerts', description: 'Get instant notifications about your journey' },
        { icon: TrendingUp, title: 'Continuous Improvement', description: 'Constantly enhancing our services' }
      ],
      statsLabels: {
        dailyPassengers: 'Daily Passengers',
        coverageArea: 'Districts Covered',
        busFleet: 'Bus Fleet',
        customerSatisfaction: 'Customer Rating'
      }
    },
    hi: {
      title: "हरियाणा रोडवेज सेवाएं",
      subtitle: "समुदायों को जोड़ना, आराम प्रदान करना",
      keyServices: [
        { icon: Bus, title: 'व्यापक नेटवर्क', description: '120+ जिलों को 2500+ बसों से जोड़ना', color: 'blue' },
        { icon: CreditCard, title: 'कई भुगतान विकल्प', description: 'सुविधाजनक डिजिटल और नकद भुगतान विकल्प', color: 'green' },
        { icon: Wifi, title: 'कनेक्टेड यात्रा', description: 'चयनित प्रीमियम बसों में मुफ्त वाई-फाई', color: 'purple' },
        { icon: MapPin, title: 'मार्ग लचीलापन', description: 'हरियाणा भर में व्यापक मार्ग नेटवर्क', color: 'orange' }
      ],
      additionalSupport: "अतिरिक्त सहायता",
      additionalServices: [
        { icon: Headphones, title: '24/7 ग्राहक सहायता', description: 'हमेशा आपकी सहायता के लिए उपलब्ध' },
        { icon: AlertTriangle, title: 'वास्तविक समय अलर्ट', description: 'अपनी यात्रा के बारे में तत्काल सूचनाएं प्राप्त करें' },
        { icon: TrendingUp, title: 'निरंतर सुधार', description: 'हमारी सेवाओं को लगातार बढ़ाना' }
      ],
      statsLabels: {
        dailyPassengers: 'दैनिक यात्री',
        coverageArea: 'कवर किए गए जिले',
        busFleet: 'बस बेड़ा',
        customerSatisfaction: 'ग्राहक रेटिंग'
      }
    }
  };

  const currentLanguage = isHindi ? translations.hi : translations.en;

  const [stats, setStats] = useState({
    dailyPassengers: 50000,
    coverageArea: 120,
    busFleet: 2500,
    customerSatisfaction: 4.5
  });

  const statsRef = useRef(null);
  const isStatsVisible = useIntersectionObserver(statsRef, { threshold: 0.1 });

  return (
    <div className="services-page">
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="services-header"
      >
        <h1 className="services-title">{currentLanguage.title}</h1>
        <p className="services-subtitle">
          {currentLanguage.subtitle}
        </p>
      </motion.header>

      <section className="key-services">
        <div className="services-grid">
          {currentLanguage.keyServices.map((service, index) => (
            <ServiceCard 
              key={index}
              {...service}
            />
          ))}
        </div>
      </section>

      <ServiceCategories isHindi={isHindi} />

      <section ref={statsRef} className="services-stats">
        <div className="stats-container">
          {Object.entries(stats).map(([key, value]) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isStatsVisible ? 1 : 0, 
                scale: isStatsVisible ? 1 : 0.8 
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="stat-item"
            >
              <div className="stat-value">
                {key === 'customerSatisfaction' ? `${value}/5` : value}
                {key === 'coverageArea' && '+'}
              </div>
              <div className="stat-label">
                {currentLanguage.statsLabels[key]}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="additional-services">
        <h2 className="section-title">{currentLanguage.additionalSupport}</h2>
        <div className="support-grid">
          {currentLanguage.additionalServices.map((service, index) => (
            <div key={index} className="support-card">
              <service.icon className="support-icon" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;