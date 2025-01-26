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

const ServiceCategories = () => {
  const [activeCategory, setActiveCategory] = useState('passenger');
  const categories = [
    { 
      id: 'passenger', 
      icon: Bus, 
      title: 'Passenger Services',
      services: [
        { title: 'Comfortable Buses', description: 'AC and Non-AC options with premium seating' },
        { title: 'Luggage Facility', description: 'Safe and secure luggage storage' },
        { title: 'Ticket Booking', description: 'Online and offline booking options' }
      ]
    },
    { 
      id: 'digital', 
      icon: Smartphone, 
      title: 'Digital Services',
      services: [
        { title: 'Mobile App', description: 'Real-time tracking and booking' },
        { title: 'Online Payment', description: 'Secure digital payment methods' },
        { title: 'E-Ticket', description: 'Instant digital ticket generation' }
      ]
    },
    { 
      id: 'safety', 
      icon: Shield, 
      title: 'Safety Services',
      services: [
        { title: 'GPS Tracking', description: 'Real-time bus location tracking' },
        { title: 'Emergency Support', description: '24/7 customer assistance' },
        { title: 'Clean Travel', description: 'Sanitized buses and safety protocols' }
      ]
    }
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

const ServicesPage = () => {
  const [stats, setStats] = useState({
    dailyPassengers: 50000,
    coverageArea: 120,
    busFleet: 2500,
    customerSatisfaction: 4.5
  });

  const statsRef = useRef(null);
  const isStatsVisible = useIntersectionObserver(statsRef, { threshold: 0.1 });

  const services = [
    {
      icon: Bus,
      title: 'Extensive Network',
      description: 'Connecting 120+ districts with 2500+ buses',
      color: 'blue'
    },
    {
      icon: CreditCard,
      title: 'Multiple Payment',
      description: 'Convenient digital and cash payment options',
      color: 'green'
    },
    {
      icon: Wifi,
      title: 'Connected Journey',
      description: 'Free Wi-Fi in select premium buses',
      color: 'purple'
    },
    {
      icon: MapPin,
      title: 'Route Flexibility',
      description: 'Comprehensive route network across Haryana',
      color: 'orange'
    }
  ];

  return (
    <div className="services-page">
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="services-header"
      >
        <h1 className="services-title">Haryana Roadways Services</h1>
        <p className="services-subtitle">
          Connecting Communities, Delivering Comfort
        </p>
      </motion.header>

      <section className="key-services">
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              {...service}
            />
          ))}
        </div>
      </section>

      <ServiceCategories />

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
                {key === 'dailyPassengers' && 'Daily Passengers'}
                {key === 'coverageArea' && 'Districts Covered'}
                {key === 'busFleet' && 'Bus Fleet'}
                {key === 'customerSatisfaction' && 'Customer Rating'}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="additional-services">
        <h2 className="section-title">Additional Support</h2>
        <div className="support-grid">
          <div className="support-card">
            <Headphones className="support-icon" />
            <h3>24/7 Customer Support</h3>
            <p>Always available to assist you</p>
          </div>
          <div className="support-card">
            <AlertTriangle className="support-icon" />
            <h3>Real-time Alerts</h3>
            <p>Get instant notifications about your journey</p>
          </div>
          <div className="support-card">
            <TrendingUp className="support-icon" />
            <h3>Continuous Improvement</h3>
            <p>Constantly enhancing our services</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;