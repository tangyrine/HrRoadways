import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Flower, Leaf, Sun, Award, Clock, 
  Calendar, Shield, Star, Users, Compass
} from 'lucide-react';
import '../assets/luxury.css';

const royalHaryanaDestinations = [
  {
    id: 1,
    name: "Sultanpur Palace, Hisar",
    description: "A majestic royal residence showcasing Haryana's architectural splendor",
    price: "₹5,999",
    rating: 4.8,
    duration: "2 Days / 1 Night",
    highlights: [
      "Heritage Palace Tour", 
      "Royal Dining Experience", 
      "Historical Museum Visit"
    ],
    location: "Hisar",
    bestSeason: "October to March",
    activities: [
      "Guided Heritage Walk",
      "Traditional Haryanvi Cuisine",
      "Architectural Photography"
    ]
  },
  {
    id: 2,
    name: "Kurukshetra Heritage Trail",
    description: "Explore the land of Mahabharata with spiritual and historical significance",
    price: "₹4,599",
    rating: 4.9,
    duration: "3 Days / 2 Nights",
    highlights: [
      "Brahma Sarovar", 
      "Jyotisar Krishna Temple", 
      "Archaeological Museums"
    ],
    location: "Kurukshetra",
    bestSeason: "Winter Months",
    activities: [
      "Spiritual Retreats",
      "Historical Exploration",
      "Cultural Workshops"
    ]
  },
  {
    id: 3,
    name: "Pehowa Royal Retreat",
    description: "Discover the serene royal heritage of ancient Haryana",
    price: "₹6,299",
    rating: 4.7,
    duration: "2 Days / 1 Night",
    highlights: [
      "Ancient Temples", 
      "Rural Luxury Experience", 
      "Traditional Craft Workshops"
    ],
    location: "Pehowa",
    bestSeason: "October to February",
    activities: [
      "Pottery Making",
      "Folk Performance",
      "Nature Walks"
    ]
  }
];

const translations = {
  en: {
    title: "Royal Haryana Odyssey",
    subtitle: "Uncover the Majestic Heritage of Haryana",
    searchPlaceholder: "Explore Royal Destinations",
    searchButton: "Discover Royal Experiences",
    features: [
      { icon: Shield, title: "Royal Safety", desc: "Comprehensive travel protection" },
      { icon: Star, title: "Curated Experiences", desc: "Handpicked royal destinations" },
      { icon: Compass, title: "Local Expertise", desc: "Expert local guides" },
      { icon: Leaf, title: "Sustainable Tourism", desc: "Eco-friendly royal experiences" }
    ]
  }
};

const RoyalHaryanaTourism = () => {
  const [destinations, setDestinations] = useState(royalHaryanaDestinations);
  const [searchTerm, setSearchTerm] = useState('');
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [filters, setFilters] = useState({
    season: '',
    duration: ''
  });
  const curtainRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurtainOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterDestinations(term);
  };

  const filterDestinations = (term) => {
    let filtered = royalHaryanaDestinations.filter(dest => 
      dest.name.toLowerCase().includes(term) ||
      dest.location.toLowerCase().includes(term)
    );

    if (filters.season) {
      filtered = filtered.filter(dest => 
        dest.bestSeason.toLowerCase().includes(filters.season.toLowerCase())
      );
    }

    if (filters.duration) {
      filtered = filtered.filter(dest => 
        dest.duration.includes(filters.duration)
      );
    }

    setDestinations(filtered);
  };

  const openDestinationModal = (destination) => {
    setSelectedDestination(destination);
  };

  const closeDestinationModal = () => {
    setSelectedDestination(null);
  };

  return (
    <div className="royal-haryana-container">
      {/* Curtain Animation */}
      <div 
        ref={curtainRef} 
        className={`curtain ${curtainOpen ? 'open' : ''}`}
      />

      {/* Header Section */}
      <header className="royal-header">
        <div className="header-overlay" />
        <div className="header-content">
          <h1 className="royal-title">Royal Haryana Odyssey</h1>
          <p className="royal-subtitle">Uncover the Majestic Heritage of Haryana</p>
        </div>
      </header>

      {/* Advanced Filters */}
      <section className="royal-filters">
        <div className="filter-container">
          <select 
            onChange={(e) => setFilters({...filters, season: e.target.value})}
            className="royal-select"
          >
            <option value="">Select Season</option>
            <option value="Winter">Winter</option>
            <option value="Summer">Summer</option>
            <option value="Monsoon">Monsoon</option>
          </select>

          <select 
            onChange={(e) => setFilters({...filters, duration: e.target.value})}
            className="royal-select"
          >
            <option value="">Select Duration</option>
            <option value="1 Night">1 Night</option>
            <option value="2 Nights">2 Nights</option>
            <option value="3 Nights">3 Nights</option>
          </select>
        </div>
      </section>

      {/* Features Section */}
      <section className="royal-features">
        {translations.en.features.map((feature, index) => (
          <div key={index} className="feature-card">
            <feature.icon className="feature-icon" />
            <div className="feature-details">
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Explore Royal Destinations" 
            value={searchTerm}
            onChange={handleSearch}
            className="royal-search-input"
          />
          <button className="royal-search-button">
            Discover Royal Experiences
          </button>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="destinations-grid">
        {destinations.map(destination => (
          <div 
            key={destination.id} 
            className="destination-card"
            onClick={() => openDestinationModal(destination)}
          >
            <div className="destination-header">
              <h2>{destination.name}</h2>
              <span className="destination-rating">
                <Star /> {destination.rating}
              </span>
            </div>
            <p className="destination-description">{destination.description}</p>
            <div className="destination-details">
              <span className="destination-price">{destination.price}</span>
              <span className="destination-duration">{destination.duration}</span>
              <span className="destination-location">
                <MapPin size={16} /> {destination.location}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Detailed Destination Modal */}
      {selectedDestination && (
        <div className="destination-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeDestinationModal}>
              ✕
            </button>
            <div className="modal-header">
              <h2>{selectedDestination.name}</h2>
              <div className="modal-meta">
                <span><Calendar /> {selectedDestination.duration}</span>
                <span><MapPin /> {selectedDestination.location}</span>
                <span><Sun /> {selectedDestination.bestSeason}</span>
              </div>
            </div>

            <div className="modal-sections">
              <div className="modal-section">
                <h3>Destination Highlights</h3>
                {selectedDestination.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
                    <Flower /> {highlight}
                  </div>
                ))}
              </div>

              <div className="modal-section">
                <h3>Recommended Activities</h3>
                {selectedDestination.activities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <Compass /> {activity}
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button className="book-now">Book Royal Experience</button>
              <button className="learn-more">Detailed Itinerary</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoyalHaryanaTourism;