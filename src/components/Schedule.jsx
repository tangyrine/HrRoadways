import React, { useState, useEffect } from 'react';
import { Clock, Filter, Search, MapPin, Calendar, Bus, AlertCircle, ArrowRight, Info } from 'lucide-react';

const Schedule = ({ isHindi = false }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availabilityData, setAvailabilityData] = useState({});

  // Simulated real-time availability polling
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        // In a real app, this would be an API call to get real-time availability
        const mockAvailability = scheduleData.reduce((acc, bus) => {
          acc[bus.id] = {
            totalSeats: 50,
            availableSeats: Math.floor(Math.random() * 51), // Random number for demo
            lastUpdated: new Date().toISOString()
          };
          return acc;
        }, {});
        setAvailabilityData(mockAvailability);
      } catch (err) {
        console.error('Error fetching availability:', err);
      }
    };

    if (scheduleData.length > 0) {
      fetchAvailability();
      // Poll for updates every 30 seconds
      const intervalId = setInterval(fetchAvailability, 30000);
      return () => clearInterval(intervalId);
    }
  }, [scheduleData]);

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        setLoading(true);
        const response = await fetch('./Databases/Haryana.json');
        if (!response.ok) {
          throw new Error('Failed to fetch bus schedule data');
        }
        const data = await response.json();
        // Add unique IDs to each bus if they don't exist
        const enhancedData = data.map((bus, index) => ({
          ...bus,
          id: bus.id || `bus-${index}`
        }));
        setScheduleData(enhancedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusData();
  }, []);

  const translations = {
    en: {
      title: "Haryana Roadways Bus Schedule",
      subtitle: "Real-time Bus Availability",
      search: "Search Routes",
      filter: "Filter",
      busType: "Bus Type",
      from: "From",
      to: "To",
      departure: "Departure",
      distance: "Distance",
      route: "Route",
      price: "Fare",
      via: "Via",
      contact: "Contact",
      loading: "Loading bus schedules...",
      error: "Error loading bus schedules. Please try again later.",
      seatsAvailable: "Seats Available",
      lastUpdated: "Last Updated",
      filterOptions: {
        all: "All Buses",
        ordinary: "Ordinary",
        volvo: "Volvo AC",
        superExpress: "Super Express"
      },
      noResults: "No buses found for your search criteria",
      popularRoutes: "Popular Routes",
      liveTracking: "Live Tracking Available"
    },
    hi: {
      // ... (Hindi translations)
      seatsAvailable: "उपलब्ध सीटें",
      lastUpdated: "अंतिम अपडेट"
    }
  };

  const [filters, setFilters] = useState({
    busType: 'all',
    date: new Date().toISOString().split('T')[0],
    searchQuery: '',
    fromLocation: '',
    toLocation: ''
  });

  const [selectedBus, setSelectedBus] = useState(null);
  const [filteredSchedule, setFilteredSchedule] = useState([]);

  useEffect(() => {
    handleFilterChange('all', '');
  }, [scheduleData]);

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    
    let filtered = scheduleData;
    
    if (newFilters.busType !== 'all') {
      filtered = filtered.filter(bus => bus.Bus_Type.toLowerCase().includes(newFilters.busType.toLowerCase()));
    }
    
    if (newFilters.fromLocation) {
      filtered = filtered.filter(bus => 
        bus.from.toLowerCase().includes(newFilters.fromLocation.toLowerCase())
      );
    }

    if (newFilters.toLocation) {
      filtered = filtered.filter(bus => 
        bus.to.toLowerCase().includes(newFilters.toLocation.toLowerCase())
      );
    }
    
    setFilteredSchedule(filtered);
  };

  const currentLanguage = isHindi ? translations.hi : translations.en;

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const AvailabilityIndicator = ({ busId }) => {
    const availability = availabilityData[busId];
    if (!availability) return null;

    const percentage = (availability.availableSeats / availability.totalSeats) * 100;
    let bgColor = 'bg-red-500';
    if (percentage > 50) bgColor = 'bg-green-500';
    else if (percentage > 20) bgColor = 'bg-yellow-500';

    return (
      <div className="mt-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-600">
            {currentLanguage.seatsAvailable}: {availability.availableSeats}/{availability.totalSeats}
          </span>
          <span className="text-xs text-gray-500">
            {currentLanguage.lastUpdated}: {formatTime(availability.lastUpdated)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`${bgColor} rounded-full h-2 transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const RouteMap = ({ stops }) => {
    const stopsList = stops.split(',').map(stop => stop.trim());
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {stopsList.map((stop, index) => (
          <div key={index} className="flex items-center">
            <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">{stop}</span>
            {index < stopsList.length - 1 && (
              <ArrowRight className="text-gray-400" size={16} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const BusCard = ({ bus, onClick }) => (
    <div 
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(bus)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Bus className="text-blue-600" size={20} />
            <span className="font-semibold text-lg">{bus.Bus_Type}</span>
          </div>
          <div className="text-sm text-gray-600">{bus.Bus_Route}</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-blue-600">{bus.Price}</div>
          <div className="text-sm text-gray-500">{bus.Total_Distance}</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-400" />
          <span className="text-sm">{bus.Departure_Time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-400" />
          <span className="text-sm">Via: {bus.Via}</span>
        </div>
        <AvailabilityIndicator busId={bus.id} />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">{currentLanguage.loading}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <AlertCircle size={48} className="mx-auto mb-4" />
          <p>{currentLanguage.error}</p>
          <p className="text-sm text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">{currentLanguage.title}</h1>
        <p className="text-blue-100">{currentLanguage.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={`${currentLanguage.from}...`}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleFilterChange('fromLocation', e.target.value)}
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={`${currentLanguage.to}...`}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleFilterChange('toLocation', e.target.value)}
          />
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="date"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={filters.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {Object.entries(currentLanguage.filterOptions).map(([value, label]) => (
          <button
            key={value}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              filters.busType === value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => handleFilterChange('busType', value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchedule.map((bus, index) => (
          <BusCard 
            key={index} 
            bus={bus} 
            onClick={setSelectedBus}
          />
        ))}
      </div>

      {selectedBus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedBus.Bus_Route}</h2>
              <button 
                onClick={() => setSelectedBus(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Route Details</h3>
                <RouteMap stops={selectedBus.Via} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Departure</p>
                  <p className="font-semibold">{selectedBus.Departure_Time}</p>
                </div>
                <div>
                  <p className="text-gray-600">Distance</p>
                  <p className="font-semibold">{selectedBus.Total_Distance}</p>
                </div>
                <div>
                  <p className="text-gray-600">Price</p>
                  <p className="font-semibold">{selectedBus.Price}</p>
                </div>
                <div>
                  <p className="text-gray-600">Contact</p>
                  <p className="font-semibold">{selectedBus.Contact}</p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Real-time Availability</h3>
                <AvailabilityIndicator busId={selectedBus.id} />
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredSchedule.length === 0 && (
        <div className="text-center py-8">
          <AlertCircle className="mx-auto text-gray-400 mb-2" size={48} />
          <p className="text-gray-600">{currentLanguage.noResults}</p>
        </div>
      )}
    </div>
  );
};

export default Schedule;
