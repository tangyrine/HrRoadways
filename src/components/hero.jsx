import  { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, Info, Repeat, Shield, Star, Phone, Users, Bus } from 'lucide-react';
import TrafficUpdates from './TrafficUpdates';
import PopularRoutes from './PopularRoutes';
import BusDetailModal from './BusDetailModal';
import WeatherUpdates from './WeatherUpdates';
import InlineBusLoader from './InlineBusLoader';
import { useComponentLoading } from '../contexts/LoadingContext';
import '../styles/hero.css';
import '../styles/modal.css';

// CustomAlert Component to display info and warning alerts
const CustomAlert = ({ type, children }) => (
  <div className={`custom-alert ${type === 'warning' ? 'warning' : 'info'}`}>
    {type === 'warning' ? <AlertCircle className="icon" /> : <Info className="icon" />}
    <p className="text">{children}</p>
  </div>
);

// CustomCard Component for reusable card layout
const CustomCard = ({ children, className }) => (
  <div className={`custom-card ${className}`}>
    {children}
  </div>
);

// Hero Component - Main Component
const Hero = ({ isHindi }) => {
  // Loading hook
  const { showLoading, hideLoading, loading } = useComponentLoading('hero-search');

  // State management
  const [currentLanguage, setCurrentLanguage] = useState({});
  const [formData, setFormData] = useState({
    src: '',
    dest: '',
    date: new Date().toISOString().split('T')[0],
    passengers: 1,
    roundTrip: false,
  });
  const [busStands, setBusStands] = useState([]);
  const [srcSuggestions, setSrcSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [showSrcSuggestions, setShowSrcSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [buses, setBuses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [activeSrcSuggestionIndex, setActiveSrcSuggestionIndex] = useState(-1);
  const [activeDestSuggestionIndex, setActiveDestSuggestionIndex] = useState(-1);

  const inputRefs = useRef([]);
  const containerRef = useRef(null);

  // Fetch language data
  useEffect(() => {
    fetch('https://jsonblob.com/api/jsonBlob/1336693063321575424')
      .then(response => response.json())
      .then(data => setCurrentLanguage(isHindi ? data.hi : data.en));
  }, [isHindi]);

  // Fetch alerts
  useEffect(() => {
    setAlerts([
      { type: 'info', message: 'Extra buses available on Delhi-Chandigarh route' },
      { type: 'warning', message: 'Weather alert: Fog expected in northern Haryana' }
    ]);
  }, []);

  // Fetch bus stands
  useEffect(() => {
    fetch('https://jsonblob.com/api/jsonBlob/1333092652136194048')
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

  // Handle input change for form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'src') {
      const filtered = busStands.filter(stand =>
        stand.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 10); // Limit to 10 locations
      setSrcSuggestions(filtered);
      setShowSrcSuggestions(true);
      setActiveSrcSuggestionIndex(-1);
    } else if (name === 'dest') {
      const filtered = busStands.filter(stand =>
        stand.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 10); // Limit to 10 locations
      setDestSuggestions(filtered);
      setShowDestSuggestions(true);
      setActiveDestSuggestionIndex(-1);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.src || !formData.dest) {
      return;
    }

    showLoading('Searching for buses...');

    try {
      // Add a small delay to show the loading animation
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await fetch('https://jsonblob.com/api/jsonBlob/1333092652136194048');
      const data = await response.json();

      const filteredBuses = data.filter(bus => {
        const isExactRoute = bus.from.toLowerCase() === formData.src.toLowerCase() && bus.to.toLowerCase() === formData.dest.toLowerCase();
        const isReverseRoute = formData.roundTrip && bus.from.toLowerCase() === formData.dest.toLowerCase() && bus.to.toLowerCase() === formData.src.toLowerCase();
        const isViaRoute = bus.from.toLowerCase() === formData.src.toLowerCase() && bus.via?.toLowerCase().includes(formData.dest.toLowerCase());
        const isViaReverseRoute = formData.roundTrip && bus.from.toLowerCase() === formData.dest.toLowerCase() && bus.via?.toLowerCase().includes(formData.src.toLowerCase());
        return isExactRoute || isReverseRoute || isViaRoute || isViaReverseRoute;
      });

      setBuses(filteredBuses);
    } catch (error) {
      console.error('Error fetching buses:', error);
    } finally {
      hideLoading();
    }
  };

  // Handle bus card click to open modal
  const handleBusCardClick = (bus) => {
    setSelectedBus(bus);
    setIsModalOpen(true);
  };

  // Close modal
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
            <div className="form-header">
              <h3 className="form-title">
                <Bus className="form-title-icon" />
                {currentLanguage.searchTitle || "Find Your Perfect Journey"}
              </h3>
              <p className="form-subtitle">
                {currentLanguage.searchSubtitle || "Book your bus tickets with ease and comfort"}
              </p>
            </div>

            <form className="form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-input-group">
                  <FormInput
                    label={currentLanguage.departure || "From"}
                    name="src"
                    value={formData.src}
                    onChange={handleChange}
                    suggestions={srcSuggestions}
                    showSuggestions={showSrcSuggestions}
                    setShowSuggestions={setShowSrcSuggestions}
                    activeSuggestionIndex={activeSrcSuggestionIndex}
                    setActiveSuggestionIndex={setActiveSrcSuggestionIndex}
                    placeholder="Enter departure city"
                  />
                </div>

                <div className="form-swap-button">
                  <button
                    type="button"
                    className="swap-btn"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        src: formData.dest,
                        dest: formData.src
                      });
                    }}
                    title="Swap cities"
                  >
                    <Repeat className="swap-icon" />
                  </button>
                </div>

                <div className="form-input-group">
                  <FormInput
                    label={currentLanguage.arrival || "To"}
                    name="dest"
                    value={formData.dest}
                    onChange={handleChange}
                    suggestions={destSuggestions}
                    showSuggestions={showDestSuggestions}
                    setShowSuggestions={setShowDestSuggestions}
                    activeSuggestionIndex={activeDestSuggestionIndex}
                    setActiveSuggestionIndex={setActiveDestSuggestionIndex}
                    disabled={!formData.src}
                    placeholder="Enter destination city"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-input-group">
                  <FormInput
                    label="Departure Date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-input-group">
                  <FormInput
                    label={currentLanguage.passengers || "Passengers"}
                    name="passengers"
                    type="number"
                    value={formData.passengers}
                    onChange={handleChange}
                    min="1"
                    max="9"
                  />
                </div>
              </div>

              <div className="form-options">
                <FormCheckbox
                  label={currentLanguage.roundTrip || "Round Trip"}
                  name="roundTrip"
                  checked={formData.roundTrip}
                  onChange={() => setFormData({ ...formData, roundTrip: !formData.roundTrip })}
                />

                <div className="form-quick-filters">
                  <span className="quick-filter-label">Quick filters:</span>
                  <div className="quick-filter-buttons">
                    <button type="button" className="quick-filter-btn">AC</button>
                    <button type="button" className="quick-filter-btn">Non-AC</button>
                    <button type="button" className="quick-filter-btn">Sleeper</button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="search-button"
                disabled={!formData.src || !formData.dest || loading}
              >
                {loading ? (
                  <>
                    <div className="search-button-spinner"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <MapPin className="search-button-icon" />
                    {currentLanguage.button || "Search Buses"}
                  </>
                )}
              </button>
            </form>
          </CustomCard>

          <div className="right-panel">
            <PopularRoutes onRouteClick={(route) => handleChange({ target: { name: 'src', value: route.src } })} />
            <WeatherUpdates />
          </div>
        </div>

        {loading && (
          <div className="bus-results">
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
              <InlineBusLoader
                size="medium"
                message="Searching for the best buses..."
                color="#667eea"
              />
            </div>
          </div>
        )}

        {!loading && buses.length > 0 && (
          <div className="bus-results">
            <h3 className="bus-results-heading">{currentLanguage.allBuses}</h3>
            <div className="bus-grid">
              {buses.map((bus, index) => (
                <BusCard key={index} bus={bus} onClick={() => handleBusCardClick(bus)} />
              ))}
            </div>
          </div>
        )}
      </div>
      <BusDetailModal isOpen={isModalOpen} onClose={closeModal} bus={selectedBus} />
    </div>
  );
};

// FormInput Component - Reusable input field with suggestions
const FormInput = ({ label, name, value, onChange, suggestions = [], showSuggestions, setShowSuggestions, type = 'text', disabled = false, min, max, placeholder, activeSuggestionIndex, setActiveSuggestionIndex }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handlePosition = () => {
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        const dropdown = inputRef.current.nextElementSibling;
        if (dropdown) {
          dropdown.parentElement.setAttribute('data-dropdown-up', rect.bottom + dropdown.offsetHeight > window.innerHeight);
        }
      }
    };

    window.addEventListener('resize', handlePosition);
    handlePosition();

    return () => {
      window.removeEventListener('resize', handlePosition);
    };
  }, [value]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
        onChange({ target: { name, value: suggestions[activeSuggestionIndex] } });
        setShowSuggestions(false);
      }
    } else if (event.key === 'ArrowDown') {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
      );
    } else if (event.key === 'ArrowUp') {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="form-group" onFocus={() => setShowSuggestions(true)} onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}>
      <label className="form-label">
        {name === 'src' || name === 'dest' ? <MapPin className="form-icon" /> : null}
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-input"
        autoComplete="off"
        disabled={disabled}
        min={min}
        max={max}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || ""}
      />
      {showSuggestions && (
        <div className={`suggestions-dropdown ${suggestions.length ? 'show' : ''}`}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`suggestion-item ${index === activeSuggestionIndex ? 'active' : ''}`}
              onMouseDown={() => onChange({ target: { name, value: suggestion } })}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// FormCheckbox Component - Reusable checkbox input
const FormCheckbox = ({ label, name, checked, onChange }) => (
  <div className="checkbox-group">
    <label className="checkbox-label">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="checkbox-input"
      />
      <span className="checkbox-custom">
        <svg className="checkbox-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </span>
      <span className="checkbox-text">
        <Repeat className="form-icon" />
        {label}
      </span>
    </label>
  </div>
);

// BusCard Component - Bus card displaying bus details
const BusCard = ({ bus, onClick }) => {
  const distance = parseFloat(bus.Total_Distance.replace(/[^0-9.]/g, ''));
  const fillPercentage = Math.min((distance / 1000) * 100, 100);

  return (
    <div className="bus-item" onClick={onClick}>
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
              {bus.Total_Distance.includes("KM") ? bus.Total_Distance : `${bus.Total_Distance} KM`}
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
            style={{ width: `${fillPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;