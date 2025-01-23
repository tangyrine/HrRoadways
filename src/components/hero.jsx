import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, AlertCircle, Info, ArrowRight, Bus, Phone, Star, Shield } from 'lucide-react';
import TrafficUpdates from './TrafficUpdates';
import '../assets/hero.css';  // Import the CSS file

const CustomAlert = ({ type, children }) => (
  <div className={`custom-alert ${type === 'warning' ? 'warning' : 'info'}`}>
    {type === 'warning' ? 
      <AlertCircle className="icon" /> : 
      <Info className="icon" />}
    <p className="text">{children}</p>
  </div>
);

const CustomCard = ({ children, className }) => (
  <div className={`custom-card ${className}`}>
    {children}
  </div>
);

const popularRoutes = [
  { src: 'Chandigarh', dest: 'Delhi', time: '2h 30m', fare: '₹450', frequency: 'Every 30 mins' },
  { src: 'Gurugram', dest: 'Panipat', time: '1h 45m', fare: '₹250', frequency: 'Every 45 mins' },
  { src: 'Faridabad', dest: 'Hisar', time: '3h', fare: '₹500', frequency: 'Every hour' },
  { src: 'Rohtak', dest: 'Ambala', time: '2h 15m', fare: '₹350', frequency: 'Every hour' }
];

const busStands = [
  'Chandigarh', 'Delhi', 'Gurugram', 'Panipat', 'Hisar',
  'Rohtak', 'Ambala', 'Faridabad', 'Karnal', 'Kurukshetra'
];

const translations = {
  en: {
    heading: "Haryana Roadways - Your Own Bus Service",
    subheading: "Your Journey, Our Pride | आपकी यात्रा, हमारा गौरव",
    departure: "From",
    arrival: "To",
    button: "Search Buses",
    popular: "Popular Routes",
    allBuses: "All Buses",
    volvo: "Volvo AC",
    superExpress: "Super Express",
    ordinary: "Ordinary",
    searchPlaceholder: "Search bus stands...",
    features: [
      { icon: Shield, title: 'Safe Travel', desc: 'GPS tracked buses' },
      { icon: Clock, title: 'Punctual', desc: '98% on-time arrival' },
      { icon: Star, title: 'Top Rated', desc: '4.5/5 user rating' },
      { icon: Phone, title: '24/7 Support', desc: 'Always here to help' }
    ]
  },
  hi: {
    heading: "हरियाणा रोडवेज - आपकी अपनी बस सेवा",
    subheading: "आपकी यात्रा, हमारा गौरव",
    departure: "कहाँ से",
    arrival: "कहाँ तक",
    button: "बसें खोजें",
    popular: "लोकप्रिय मार्ग",
    allBuses: "सभी बसें",
    volvo: "वोल्वो एसी",
    superExpress: "सुपर एक्सप्रेस",
    ordinary: "साधारण",
    searchPlaceholder: "बस स्टैंड खोजें...",
    features: [
      { icon: Shield, title: 'सुरक्षित यात्रा', desc: 'जीपीएस ट्रैक की गई बसें' },
      { icon: Clock, title: 'समयनिष्ठ', desc: '98% समय पर आगमन' },
      { icon: Star, title: 'शीर्ष रेटेड', desc: '4.5/5 उपयोगकर्ता रेटिंग' },
      { icon: Phone, title: '24/7 सहायता', desc: 'हमेशा मदद के लिए यहाँ' }
    ]
  }
};

const Hero = ({ isHindi }) => {
  const [currentLanguage, setCurrentLanguage] = useState(translations.en);
  const [selectedBusType, setSelectedBusType] = useState('all');
  const [formData, setFormData] = useState({
    src: '',
    dest: '',
    date: new Date().toISOString().split('T')[0],
    passengers: 1
  });
  const [filteredStands, setFilteredStands] = useState([]);
  const [showSrcSuggestions, setShowSrcSuggestions] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setCurrentLanguage(isHindi ? translations.hi : translations.en);
  }, [isHindi]);

  useEffect(() => {
    setAlerts([
      { type: 'info', message: 'Extra buses available on Delhi-Chandigarh route' },
      { type: 'warning', message: 'Weather alert: Fog expected in northern Haryana' }
    ]);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'src') {
      const filtered = busStands.filter(stand => 
        stand.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStands(filtered);
      setShowSrcSuggestions(true);
    }
  };

  return (
    <div className="hero-container">
      <div className="hero-header">
        <div className="hero-header-overlay" />
        <div className="hero-header-content">
          <h1 className="hero-heading">{currentLanguage.heading}</h1>
          <p className="hero-subheading">{currentLanguage.subheading}</p>
        </div>
      </div>

      <div className="hero-features">
        <div className="features-container">
          {currentLanguage.features.map((feature, index) => (
            <div key={index} className="feature-item">
              <feature.icon className="feature-icon" />
              <div>
                <div className="feature-title">{feature.title}</div>
                <div className="feature-desc">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-content">
        <div className="content-grid">
          <CustomCard className="form-card">
            <form className="form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <MapPin className="form-icon" />
                    {currentLanguage.departure}
                  </label>
                  <input
                    type="text"
                    name="src"
                    value={formData.src}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={currentLanguage.searchPlaceholder}
                  />
                  {showSrcSuggestions && (
                    <div className="suggestions-container">
                      {filteredStands.map((stand) => (
                        <div
                          key={stand}
                          className="suggestion-item"
                          onClick={() => {
                            setFormData({ ...formData, src: stand });
                            setShowSrcSuggestions(false);
                          }}
                        >
                          {stand}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <MapPin className="form-icon" />
                    {currentLanguage.arrival}
                  </label>
                  <input
                    type="text"
                    name="dest"
                    value={formData.dest}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={currentLanguage.searchPlaceholder}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Calendar className="form-icon" />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Users className="form-icon" />
                    Passengers
                  </label>
                  <input
                    type="number"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    className="form-input"
                    min="1"
                  />
                </div>
              </div>

              <div className="bus-type-container">
                {['all', 'volvo', 'superExpress', 'ordinary'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedBusType(type)}
                    className={`bus-type-button ${selectedBusType === type ? 'selected' : ''}`}
                  >
                    <Bus className="bus-type-icon" />
                    {currentLanguage[type]}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="search-button"
              >
                {currentLanguage.button}
              </button>
            </form>
          </CustomCard>

          <div className="right-panel">
            <CustomCard className="popular-routes-card">
              <h3 className="popular-routes-heading">
                {currentLanguage.popular}
              </h3>
              <div className="popular-routes-list">
                {popularRoutes.map((route, index) => (
                  <div
                    key={index}
                    className="popular-route-item"
                  >
                    <div className="route-info">
                      <span className="route-src">{route.src}</span>
                      <ArrowRight className="route-arrow" />
                      <span className="route-dest">{route.dest}</span>
                    </div>
                    <div className="route-details">
                      <span>{route.time}</span>
                      <span>{route.fare}</span>
                      <span>{route.frequency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CustomCard>

            <div className="traffic-updates">
              <TrafficUpdates />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;