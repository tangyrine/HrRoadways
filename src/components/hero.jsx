import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, Info, ArrowRight, Shield, Star, Phone, Users, Repeat } from 'lucide-react';
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
    passengers: "Passengers",
    roundTrip: "Round Trip",
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
    passengers: "यात्री",
    roundTrip: "राउंड ट्रिप",
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
  const [formData, setFormData] = useState({
    src: '',
    dest: '',
    date: new Date().toISOString().split('T')[0],
    passengers: 1,
    roundTrip: false,
  });
  const [busStands, setBusStands] = useState([]);
  const [filteredSrcStands, setFilteredSrcStands] = useState([]);
  const [filteredDestStands, setFilteredDestStands] = useState([]);
  const [showSrcSuggestions, setShowSrcSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [activeInput, setActiveInput] = useState('');
  const [buses, setBuses] = useState([]);
  const suggestionsRef = useRef([]);

  useEffect(() => {
    setCurrentLanguage(isHindi ? translations.hi : translations.en);
  }, [isHindi]);

  useEffect(() => {
    setAlerts([
      { type: 'info', message: 'Extra buses available on Delhi-Chandigarh route' },
      { type: 'warning', message: 'Weather alert: Fog expected in northern Haryana' }
    ]);
  }, []);

  useEffect(() => {
    fetch('/Databases/Haryana.json')
      .then(response => response.json())
      .then(data => {
        const uniqueBusStands = new Set();
        data.forEach(route => {
          uniqueBusStands.add(route.from);
          uniqueBusStands.add(route.to);
        });
        setBusStands([...uniqueBusStands]);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'src') {
      const filtered = busStands.filter(stand => 
        stand.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 10); // Limit to 10 locations
      setFilteredSrcStands(filtered);
      setShowSrcSuggestions(true);
      setFilteredDestStands([]);
      setShowDestSuggestions(false);
      setActiveInput('src');
      setActiveSuggestionIndex(-1);
    } else if (name === 'dest' && formData.src) {
      const filtered = busStands.filter(stand => 
        stand.toLowerCase().includes(value.toLowerCase()) && stand !== formData.src
      ).slice(0, 10); // Limit to 10 locations
      setFilteredDestStands(filtered);
      setShowDestSuggestions(true);
      setActiveInput('dest');
      setActiveSuggestionIndex(-1);
    }
  };

  const handleKeyDown = (event) => {
    if (activeInput === 'src' && showSrcSuggestions) {
      if (event.key === 'ArrowDown') {
        setActiveSuggestionIndex((prevIndex) => {
          const newIndex = prevIndex === filteredSrcStands.length - 1 ? 0 : prevIndex + 1;
          suggestionsRef.current[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return newIndex;
        });
      } else if (event.key === 'ArrowUp') {
        setActiveSuggestionIndex((prevIndex) => {
          const newIndex = prevIndex <= 0 ? filteredSrcStands.length - 1 : prevIndex - 1;
          suggestionsRef.current[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return newIndex;
        });
      } else if (event.key === 'Enter' && activeSuggestionIndex >= 0) {
        setFormData({ ...formData, src: filteredSrcStands[activeSuggestionIndex] });
        setShowSrcSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    } else if (activeInput === 'dest' && showDestSuggestions) {
      if (event.key === 'ArrowDown') {
        setActiveSuggestionIndex((prevIndex) => {
          const newIndex = prevIndex === filteredDestStands.length - 1 ? 0 : prevIndex + 1;
          suggestionsRef.current[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return newIndex;
        });
      } else if (event.key === 'ArrowUp') {
        setActiveSuggestionIndex((prevIndex) => {
          const newIndex = prevIndex <= 0 ? filteredDestStands.length - 1 : prevIndex - 1;
          suggestionsRef.current[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return newIndex;
        });
      } else if (event.key === 'Enter' && activeSuggestionIndex >= 0) {
        setFormData({ ...formData, dest: filteredDestStands[activeSuggestionIndex] });
        setShowDestSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    }
  };

  const handleSuggestionClick = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
    setShowSrcSuggestions(false);
    setShowDestSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const handlePopularRouteClick = (route) => {
    setFormData({
      ...formData,
      src: route.src,
      dest: route.dest
    });
    setFilteredSrcStands([]);
    setShowSrcSuggestions(false);
    setFilteredDestStands([]);
    setShowDestSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/Databases/Haryana.json')
      .then(response => response.json())
      .then(data => {
        const filteredBuses = data.filter(bus => {
          const isExactRoute =
            bus.from.toLowerCase() === formData.src.toLowerCase() &&
            bus.to.toLowerCase() === formData.dest.toLowerCase();
          const isReverseRoute =
            formData.roundTrip &&
            bus.from.toLowerCase() === formData.dest.toLowerCase() &&
            bus.to.toLowerCase() === formData.src.toLowerCase();
          const isViaRoute =
            bus.from.toLowerCase() === formData.src.toLowerCase() &&
            bus.via?.toLowerCase().includes(formData.dest.toLowerCase());
          const isViaReverseRoute =
            formData.roundTrip &&
            bus.from.toLowerCase() === formData.dest.toLowerCase() &&
            bus.via?.toLowerCase().includes(formData.src.toLowerCase());

          return isExactRoute || isReverseRoute || isViaRoute || isViaReverseRoute;
        });
        setBuses(filteredBuses);
      });
  };

  const handleCheckboxChange = () => {
    setFormData({ ...formData, roundTrip: !formData.roundTrip });
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
            <form className="form" onKeyDown={handleKeyDown} onSubmit={handleSubmit}>
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
                  autoComplete="off" // Disable Chrome autocomplete
                  onFocus={() => setActiveInput('src')}
                />
                {showSrcSuggestions && (
                  <div className="suggestions-container">
                    {filteredSrcStands.map((stand, index) => (
                      <div
                        key={stand}
                        ref={(el) => suggestionsRef.current[index] = el}
                        className={`suggestion-item ${index === activeSuggestionIndex ? 'active' : ''}`}
                        onClick={() => handleSuggestionClick('src', stand)}
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
                  autoComplete="off" // Disable Chrome autocomplete
                  disabled={!formData.src}
                  onFocus={() => setActiveInput('dest')}
                />
                {showDestSuggestions && (
                  <div className="suggestions-container">
                    {filteredDestStands.map((stand, index) => (
                      <div
                        key={stand}
                        ref={(el) => suggestionsRef.current[index] = el}
                        className={`suggestion-item ${index === activeSuggestionIndex ? 'active' : ''}`}
                        onClick={() => handleSuggestionClick('dest', stand)}
                      >
                        {stand}
                      </div>
                    ))}
                  </div>
                )}
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
                  {currentLanguage.passengers}
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

              <div className="form-group">
                <label className="form-label">
                  <Repeat className="form-icon" />
                  {currentLanguage.roundTrip}
                </label>
                <input
                  type="checkbox"
                  name="roundTrip"
                  checked={formData.roundTrip}
                  onChange={handleCheckboxChange}
                  className="form-checkbox"
                />
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
                    onClick={() => handlePopularRouteClick(route)}
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

        {buses.length > 0 && (
          <div className="bus-results">
            <h3 className="bus-results-heading">{currentLanguage.allBuses}</h3>
            <div className="bus-grid">
              {buses.map((bus, index) => (
                <div key={index} className="bus-item">
                  <div className="bus-info">
                    <span className="bus-route">{bus.Bus_Route}</span>
                    <span className="bus-departure">{bus.Departure_Time}</span>
                    <span className="bus-distance">{bus.Total_Distance}</span>
                    <span className="bus-price">{bus.Price}</span>
                    <span className="bus-type">{bus.Bus_Type}</span>
                    <span className="bus-via">{bus.Via}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
