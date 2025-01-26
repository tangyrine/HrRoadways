import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Flower, Leaf, Sun, Award, Clock, 
  Calendar, Shield, Star, Users, Compass
} from 'lucide-react';
import '../styles/luxury.css';

const royalHaryanaDestinations = [
  {
    id: 1,
    name: {
      en: "Sultanpur Palace, Hisar",
      hi: "सुल्तानपुर महल, हिसार"
    },
    description: {
      en: "A majestic royal residence showcasing Haryana's architectural splendor",
      hi: "हरियाणा की वास्तुकला की भव्यता को प्रदर्शित करने वाला एक शानदार शाही निवास"
    },
    price: "₹5,999",
    rating: 4.8,
    duration: {
      en: "2 Days / 1 Night",
      hi: "2 दिन / 1 रात"
    },
    highlights: {
      en: ["Heritage Palace Tour", "Royal Dining Experience", "Historical Museum Visit"],
      hi: ["विरासत महल दौरा", "शाही भोजन अनुभव", "ऐतिहासिक संग्रहालय यात्रा"]
    },
    location: {
      en: "Hisar",
      hi: "हिसार"
    },
    bestSeason: {
      en: "October to March",
      hi: "अक्टूबर से मार्च"
    },
    activities: {
      en: ["Guided Heritage Walk", "Traditional Haryanvi Cuisine", "Architectural Photography"],
      hi: ["गाइडेड विरासत वॉक", "पारंपरिक हरियाणवी भोजन", "वास्तुकला फोटोग्राफी"]
    }
  },
  {
    id: 2,
    name: {
      en: "Kurukshetra Heritage Trail",
      hi: "कुरुक्षेत्र विरासत पथ"
    },
    description: {
      en: "Explore the land of Mahabharata with spiritual and historical significance",
      hi: "आध्यात्मिक और ऐतिहासिक महत्व के साथ महाभारत की भूमि का अन्वेषण करें"
    },
    price: "₹4,599",
    rating: 4.9,
    duration: {
      en: "3 Days / 2 Nights",
      hi: "3 दिन / 2 रातें"
    },
    highlights: {
      en: ["Brahma Sarovar", "Jyotisar Krishna Temple", "Archaeological Museums"],
      hi: ["ब्रह्म सरोवर", "ज्योतिसार कृष्ण मंदिर", "पुरातात्विक संग्रहालय"]
    },
    location: {
      en: "Kurukshetra",
      hi: "कुरुक्षेत्र"
    },
    bestSeason: {
      en: "Winter Months",
      hi: "सर्दियों के महीने"
    },
    activities: {
      en: ["Spiritual Retreats", "Historical Exploration", "Cultural Workshops"],
      hi: ["आध्यात्मिक विश्राम", "ऐतिहासिक अन्वेषण", "सांस्कृतिक कार्यशालाएं"]
    }
  },
  {
    id: 3,
    name: {
      en: "Pehowa Royal Retreat",
      hi: "पिहोवा रॉयल रिट्रीट"
    },
    description: {
      en: "Discover the serene royal heritage of ancient Haryana",
      hi: "प्राचीन हरियाणा की शांत शाही विरासत की खोज करें"
    },
    price: "₹6,299",
    rating: 4.7,
    duration: {
      en: "2 Days / 1 Night",
      hi: "2 दिन / 1 रात"
    },
    highlights: {
      en: ["Ancient Temples", "Rural Luxury Experience", "Traditional Craft Workshops"],
      hi: ["प्राचीन मंदिर", "ग्रामीण लक्जरी अनुभव", "पारंपरिक शिल्प कार्यशालाएं"]
    },
    location: {
      en: "Pehowa",
      hi: "पिहोवा"
    },
    bestSeason: {
      en: "October to February",
      hi: "अक्टूबर से फरवरी"
    },
    activities: {
      en: ["Pottery Making", "Folk Performance", "Nature Walks"],
      hi: ["मिट्टी के बर्तन बनाना", "लोक प्रदर्शन", "प्रकृति की सैर"]
    }
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
  },
  hi: {
    title: "रॉयल हरियाणा ओडिसी",
    subtitle: "हरियाणा की भव्य विरासत का अनावरण करें",
    searchPlaceholder: "रॉयल गंतव्यों का अन्वेषण करें",
    searchButton: "रॉयल अनुभवों की खोज करें",
    features: [
      { icon: Shield, title: "रॉयल सुरक्षा", desc: "व्यापक यात्रा संरक्षण" },
      { icon: Star, title: "क्यूरेटेड अनुभव", desc: "हाथ से चुने गए रॉयल गंतव्य" },
      { icon: Compass, title: "स्थानीय विशेषज्ञता", desc: "विशेषज्ञ स्थानीय गाइड" },
      { icon: Leaf, title: "सस्टेनेबल टूरिज्म", desc: "पर्यावरण के अनुकूल रॉयल अनुभव" }
    ]
  }
};

const RoyalHaryanaTourism = ({ isHindi }) => {
  const [destinations, setDestinations] = useState(royalHaryanaDestinations);
  const [searchTerm, setSearchTerm] = useState('');
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [filters, setFilters] = useState({
    season: '',
    duration: ''
  });
  const curtainRef = useRef(null);

  const currentLanguage = isHindi ? translations.hi : translations.en;

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
      dest.name.en.toLowerCase().includes(term) ||
      dest.location.en.toLowerCase().includes(term)
    );

    if (filters.season) {
      filtered = filtered.filter(dest => 
        dest.bestSeason.en.toLowerCase().includes(filters.season.toLowerCase())
      );
    }

    if (filters.duration) {
      filtered = filtered.filter(dest => 
        dest.duration.en.includes(filters.duration)
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
          <h1 className="royal-title">{currentLanguage.title}</h1>
          <p className="royal-subtitle">{currentLanguage.subtitle}</p>
        </div>
      </header>

      {/* Advanced Filters */}
      <section className="royal-filters">
        <div className="filter-container">
          <select 
            onChange={(e) => setFilters({...filters, season: e.target.value})}
            className="royal-select"
          >
            <option value="">{currentLanguage.searchPlaceholder}</option>
            <option value="Winter">{isHindi ? 'सर्दी' : 'Winter'}</option>
            <option value="Summer">{isHindi ? 'गर्मी' : 'Summer'}</option>
            <option value="Monsoon">{isHindi ? 'मानसून' : 'Monsoon'}</option>
          </select>

          <select 
            onChange={(e) => setFilters({...filters, duration: e.target.value})}
            className="royal-select"
          >
            <option value="">{currentLanguage.searchPlaceholder}</option>
            <option value="1 Night">{isHindi ? '1 रात' : '1 Night'}</option>
            <option value="2 Nights">{isHindi ? '2 रातें' : '2 Nights'}</option>
            <option value="3 Nights">{isHindi ? '3 रातें' : '3 Nights'}</option>
          </select>
        </div>
      </section>

      {/* Features Section */}
      <section className="royal-features">
        {currentLanguage.features.map((feature, index) => (
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
            placeholder={currentLanguage.searchPlaceholder}
            value={searchTerm}
            onChange={handleSearch}
            className="royal-search-input"
          />
          <button className="royal-search-button">
            {currentLanguage.searchButton}
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
              <h2>{isHindi ? destination.name.hi : destination.name.en}</h2>
              <span className="destination-rating">
                <Star /> {destination.rating}
              </span>
            </div>
            <p className="destination-description">
              {isHindi ? destination.description.hi : destination.description.en}
            </p>
            <div className="destination-details">
              <span className="destination-price">{destination.price}</span>
              <span className="destination-duration">
                {isHindi ? destination.duration.hi : destination.duration.en}
              </span>
              <span className="destination-location">
                <MapPin size={16} /> {isHindi ? destination.location.hi : destination.location.en}
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
              <h2>{isHindi ? selectedDestination.name.hi : selectedDestination.name.en}</h2>
              <div className="modal-meta">
                <span><Calendar /> {isHindi ? selectedDestination.duration.hi : selectedDestination.duration.en}</span>
                <span><MapPin /> {isHindi ? selectedDestination.location.hi : selectedDestination.location.en}</span>
                <span><Sun /> {isHindi ? selectedDestination.bestSeason.hi : selectedDestination.bestSeason.en}</span>
              </div>
            </div>

            <div className="modal-sections">
              <div className="modal-section">
                <h3>{isHindi ? 'गंतव्य हाइलाइट्स' : 'Destination Highlights'}</h3>
                {isHindi
                  ? selectedDestination.highlights.hi.map((highlight, index) => (
                      <div key={index} className="highlight-item">
                        <Flower /> {highlight}
                      </div>
                    ))
                  : selectedDestination.highlights.en.map((highlight, index) => (
                      <div key={index} className="highlight-item">
                        <Flower /> {highlight}
                      </div>
                    ))}
              </div>

              <div className="modal-section">
                <h3>{isHindi ? 'अनुशंसित गतिविधियाँ' : 'Recommended Activities'}</h3>
                {isHindi
                  ? selectedDestination.activities.hi.map((activity, index) => (
                      <div key={index} className="activity-item">
                        <Compass /> {activity}
                      </div>
                    ))
                  : selectedDestination.activities.en.map((activity, index) => (
                      <div key={index} className="activity-item">
                        <Compass /> {activity}
                      </div>
                    ))}
              </div>
            </div>

            <div className="modal-actions">
              <button className="book-now">{isHindi ? 'रॉयल अनुभव बुक करें' : 'Book Royal Experience'}</button>
              <button className="learn-more">{isHindi ? 'विस्तृत यात्रा कार्यक्रम' : 'Detailed Itinerary'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoyalHaryanaTourism;