import React, { useState } from "react";
import "../assets/Trip.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const hotels = [
  {
    id: 1,
    name: "Heritage Haveli",
    location: "Kurukshetra, Haryana",
    pricePerNight: 3500,
    rating: 4.5,
    image: "/HotelImages/Hotel01.jpg",
  },
  {
    id: 2,
    name: "City Comfort Inn",
    location: "Panipat, Haryana",
    pricePerNight: 2200,
    rating: 4.2,
    image: "/HotelImages/Hotel02.jpg",
  },
  {
    id: 3,
    name: "Luxury Stay",
    location: "Gurugram, Haryana",
    pricePerNight: 5000,
    rating: 4.8,
    image: "/HotelImages/Hotel03.jpg",
  },
  {
    id: 4,
    name: "Desert Resort",
    location: "Hisar, Haryana",
    pricePerNight: 4000,
    rating: 4.4,
    image: "/HotelImages/Hotel04.jpeg",
  },
  {
    id: 5,
    name: "Hilltop Paradise",
    location: "Panchkula, Haryana",
    pricePerNight: 4500,
    rating: 4.7,
    image: "/HotelImages/Hotel01.jpg",
  },
  {
    id: 6,
    name: "Urban Retreat",
    location: "Faridabad, Haryana",
    pricePerNight: 3000,
    rating: 4.3,
    image: "/HotelImages/Hotel02.jpg",
  },
  {
    id: 7,
    name: "Green Valley Inn",
    location: "Karnal, Haryana",
    pricePerNight: 2500,
    rating: 4.1,
    image: "/HotelImages/Hotel03.jpg",
  },
  {
    id: 8,
    name: "Lakeview Lodge",
    location: "Rohtak, Haryana",
    pricePerNight: 3800,
    rating: 4.6,
    image: "/HotelImages/Hotel04.jpeg",
  },
];

function SidebarFilter({ filters, onFilterChange }) {
  const [priceRange, setPriceRange] = useState([500, 8000]);
  const [minRating, setMinRating] = useState(0);

  const handlePriceChange = (range) => {
    setPriceRange(range);
    onFilterChange("priceRange", range);
  };

  const handleRatingChange = (rating) => {
    setMinRating(rating);
    onFilterChange("minRating", rating);
  };

  return (
    <div className="sidebar-filter">
      <h3>Filters</h3>
      <div className="filter-section">
        <h4>Price Range</h4>
        <Slider
          range
          min={500}
          max={8000}
          step={200}
          value={priceRange}
          onChange={handlePriceChange}
          className="slider"
        />
        <div className="range-labels">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
      <div className="filter-section">
        <h4>Minimum Rating</h4>
        <Slider
          min={0}
          max={5}
          step={0.1}
          value={minRating}
          onChange={handleRatingChange}
          className="slider"
        />
        <div className="range-labels">
          <span>{minRating} Stars</span>
        </div>
      </div>
    </div>
  );
}

function HotelCard({ hotel }) {
  return (
    <div className="hotel-card">
      <img src={hotel.image} alt={hotel.name} className="hotel-image" />
      <div className="hotel-details">
        <h3 className="hotel-name">{hotel.name}</h3>
        <p className="hotel-location">{hotel.location}</p>
        <p className="hotel-price">${hotel.pricePerNight} / night</p>
        <p className="hotel-rating">Rating: {hotel.rating} / 5</p>
      </div>
    </div>
  );
}

function Trip() {
  const [filters, setFilters] = useState({
    priceRange: [500, 8000],
    minRating: 0,
  });

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
  };

  const filteredHotels = hotels.filter((hotel) => {
    const matchesPrice =
      hotel.pricePerNight >= filters.priceRange[0] &&
      hotel.pricePerNight <= filters.priceRange[1];

    const matchesRating = hotel.rating >= filters.minRating;

    return matchesPrice && matchesRating;
  });

  return (
    <div className="trip-container">
      <div className="trip-sidebar">
        <SidebarFilter filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <div className="trip-main">
        <h2 className="trip-title">Hotels</h2>
        <div className="hotel-grid">
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))
          ) : (
            <p>No hotels match your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Trip;
