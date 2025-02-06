import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, Info, Repeat, Shield, Star, Phone, Users } from 'lucide-react';
import TrafficUpdates from './TrafficUpdates';
import PopularRoutes from './PopularRoutes';
import BusDetailModal from './BusDetailModal';
import WeatherUpdates from './WeatherUpdates';  
import '../styles/hero.css';
import '../styles/modal.css'; // Import modal styles

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

const Hero = ({ isHindi }) => {
  const [currentLanguage, setCurrentLanguage] = useState({});
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
  const inputRefs = useRef([]);
  const containerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    fetch('https://jsonblob.com/api/jsonBlob/1336693063321575424')
      .then(response => response.json())
      .then(data => {
        setCurrentLanguage(isHindi ? data.hi : data.en);
      });
  }, [isHindi]);

  useEffect(() => {
    setAlerts([
      { type: 'info', message: 'Extra buses available on Delhi-Chandigarh route' },
      { type: 'warning', message: 'Weather alert: Fog expected in northern Haryana' }
    ]);
  }, []);

  useEffect(() => {
    fetch('https://jsonblob.com/api/jsonBlob/1333092652136194048')//Json updated in the json blob editor to remove redundant data
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSrcSuggestions(false);
        setShowDestSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
    if (event.key === 'Enter') {
      event.preventDefault();
      if (activeSuggestionIndex >= 0) {
        if (activeInput === 'src') {
          setFormData({ ...formData, src: filteredSrcStands[activeSuggestionIndex] });
          setShowSrcSuggestions(false);
        } else if (activeInput === 'dest') {
          setFormData({ ...formData, dest: filteredDestStands[activeSuggestionIndex] });
          setShowDestSuggestions(false);
        }
        setActiveSuggestionIndex(-1);
      }

      const currentIndex = inputRefs.current.indexOf(document.activeElement);
      if (currentIndex >= 0 && currentIndex < inputRefs.current.length - 1) {
        inputRefs.current[currentIndex + 1].focus();
      } else if (currentIndex === inputRefs.current.length - 1) {
        handleSubmit(event);
      }
    } else if (activeInput === 'src' && showSrcSuggestions) {
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
    fetch('https://jsonblob.com/api/jsonBlob/1333092652136194048')//rou
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

  const handleBusCardClick = (bus) => {
    setSelectedBus(bus);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBus(null);
  };

  return (
    <div className="hero-container" ref={containerRef}>
      <div className="hero-header">
        <div className="hero-header-overlay" />
        <div className="hero-header-content">
          <h1 className="hero-heading">{currentLanguage.heading}</h1>
          <p className="hero-subheading">{currentLanguage.subheading}</p>
        </div>
      </div>

      <div className="hero-features">
        <div className="features-container">
          {currentLanguage.features?.map((feature, index) => {
            const IconComponent = feature.icon === "Shield" ? Shield : feature.icon === "Clock" ? Clock : feature.icon === "Star" ? Star : feature.icon === "Phone" ? Phone : null;

            return (
              <div key={index} className="feature-item">
                {IconComponent && <IconComponent className="feature-icon" />}
                <div>
                  <div className="feature-title">{feature.title}</div>
                  <div className="feature-desc">{feature.desc}</div>
                </div>
              </div>
            );
          })}
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
                  ref={(el) => (inputRefs.current[0] = el)}
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
                  ref={(el) => (inputRefs.current[1] = el)}
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
                  ref={(el) => (inputRefs.current[2] = el)}
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
                  ref={(el) => (inputRefs.current[3] = el)}
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
            <PopularRoutes onRouteClick={handlePopularRouteClick} /> {/* Pass the function as a prop */}

            <div className="traffic-updates">
              <WeatherUpdates />
            </div>
          </div>
        </div>

        {buses.length > 0 && (
          <div className="bus-results">
            <h3 className="bus-results-heading">{currentLanguage.allBuses}</h3>
            <div className="bus-grid">
              {buses.map((bus, index) => {
                const distance = parseFloat(bus.Total_Distance.replace(/[^0-9.]/g, ''));
                const fillPercentage = Math.min((distance / 1000) * 100, 100);

                return (
                  <div key={index} className="bus-item" onClick={() => handleBusCardClick(bus)}>
                    <div className="bus-info">
                      <div className="bus-card-header">
                        <div className="bus-card-title">
                          <Clock size={20} className="text-blue-600" />
                          <span>{bus.Bus_Type}</span>
                        </div>
                        <div className="bus-card-price">
                          <div className="bus-card-price-value">
                          {bus.Price.includes("₹") ? bus.Price : `₹${bus.Price}`}
                          </div>
                          <div className="bus-card-price-distance">
                            {bus.Total_Distance.includes("KM")
                              ? bus.Total_Distance
                              : `${bus.Total_Distance} KM`}
                          </div>
                        </div>
                      </div>
                      <div className="bus-card-details">
                        <div className="bus-card-detail">
                          <MapPin size={16} className="text-gray-400" />
                          <span>{bus.Departure_Time}</span>
                        </div>
                        <div className="bus-card-detail">
                          <MapPin size={16} className="text-gray-400" />
                          <span>Via: {bus.Via}</span>
                        </div>
                      </div>
                      <div className="distance-bar-wrapper">
                        <div
                          className="distance-bar-fill"
                          style={{
                            width: `${fillPercentage}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <BusDetailModal isOpen={isModalOpen} onClose={closeModal} bus={selectedBus} />
    </div>
  );
};

export default Hero;