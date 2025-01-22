import React, { useState, useEffect } from 'react';
import { Bus, Clock, MapPin, Phone, RotateCw, Users } from 'lucide-react';

const translations = {
  en: {
    title: "Live Bus Tracking",
    subtitle: "Track your bus in real-time",
    activeBuses: "Active Buses",
    loading: "Loading bus locations...",
    updateTime: "Last Updated",
    refreshing: "Refreshing locations...",
    busInfo: {
      route: "Route",
      speed: "Current Speed",
      nextStop: "Next Stop",
      eta: "ETA",
      passengers: "Passengers",
      driver: "Driver",
      contact: "Contact"
    },
    kmh: "km/h",
    minutes: "min"
  },
  hi: {
    title: "लाइव बस ट्रैकिंग",
    subtitle: "अपनी बस को वास्तविक समय में ट्रैक करें",
    activeBuses: "सक्रिय बसें",
    loading: "बस स्थान लोड हो रहे हैं...",
    updateTime: "अंतिम अपडेट",
    refreshing: "स्थान ताजगी कर रहे हैं...",
    busInfo: {
      route: "रूट",
      speed: "वर्तमान गति",
      nextStop: "अगला स्टॉप",
      eta: "ETA",
      passengers: "यात्री",
      driver: "चालक",
      contact: "संपर्क"
    },
    kmh: "किमी/घंटा",
    minutes: "मिनट"
  }
};

const mockBusData = [
  {
    id: "HR-01-1234",
    routeNumber: "Delhi-Chandigarh Express",
    currentLocation: [28.7041, 77.1025],
    route: [
      [28.7041, 77.1025],
      [29.1042, 77.3124],
      [30.3752, 76.7821]
    ],
    speed: 65,
    nextStop: "Panipat",
    eta: 25,
    passengers: 32,
    capacity: 50,
    driver: "Rajesh Kumar",
    contact: "+91 98765-43210",
    status: "On Time"
  },
  {
    id: "HR-02-5678",
    routeNumber: "Gurgaon-Sonipat Express",
    currentLocation: [28.4595, 77.0266],
    route: [
      [28.4595, 77.0266],
      [28.6139, 77.2090],
      [28.9931, 77.0151]
    ],
    speed: 55,
    nextStop: "Rohini",
    eta: 15,
    passengers: 28,
    capacity: 45,
    driver: "Amit Singh",
    contact: "+91 98765-43211",
    status: "Delayed"
  }
];

const BusListItem = ({ bus, onClick, isSelected }) => (
  <div
    onClick={() => onClick(bus)}
    className="bg-white border rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-50 mb-2"
    style={{
      borderColor: isSelected ? '#3b82f6' : '#e5e7eb',
      backgroundColor: isSelected ? '#eff6ff' : 'white'
    }}
  >
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center gap-2">
          <Bus color="#2563eb" size={20} />
          <span className="font-semibold">{bus.routeNumber}</span>
        </div>
        <div className="text-sm text-gray-600 mt-1">{bus.id}</div>
      </div>
      <div 
        className="px-2 py-1 rounded text-sm"
        style={{
          backgroundColor: bus.status === 'On Time' ? '#dcfce7' : '#fef9c3',
          color: bus.status === 'On Time' ? '#166534' : '#854d0e'
        }}
      >
        {bus.status}
      </div>
    </div>

    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
      <div className="flex items-center gap-1">
        <MapPin size={14} color="#9ca3af" />
        <span>{bus.nextStop}</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock size={14} color="#9ca3af" />
        <span>ETA: {bus.eta} min</span>
      </div>
      <div className="flex items-center gap-1">
        <Users size={14} color="#9ca3af" />
        <span>{bus.passengers}/{bus.capacity}</span>
      </div>
    </div>
  </div>
);

const BusDetails = ({ bus, language }) => (
  <div className="bg-white rounded-lg shadow-lg p-4 mt-6">
    <h3 className="text-lg font-semibold mb-4">{bus.routeNumber}</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-sm text-gray-600">{language.busInfo.speed}</label>
        <p className="font-semibold">{bus.speed} {language.kmh}</p>
      </div>
      <div>
        <label className="text-sm text-gray-600">{language.busInfo.nextStop}</label>
        <p className="font-semibold">{bus.nextStop}</p>
      </div>
      <div>
        <label className="text-sm text-gray-600">{language.busInfo.eta}</label>
        <p className="font-semibold">{bus.eta} {language.minutes}</p>
      </div>
      <div>
        <label className="text-sm text-gray-600">{language.busInfo.passengers}</label>
        <p className="font-semibold">{bus.passengers}/{bus.capacity}</p>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t">
      <div className="mb-2">
        <label className="text-sm text-gray-600">{language.busInfo.driver}</label>
        <p className="font-semibold">{bus.driver}</p>
      </div>
      <div>
        <label className="text-sm text-gray-600">{language.busInfo.contact}</label>
        <p className="font-semibold flex items-center gap-2">
          <Phone size={16} color="#2563eb" />
          {bus.contact}
        </p>
      </div>
    </div>
  </div>
);

const BusTracker = ({ isHindi = false }) => {
    const [activeBuses, setActiveBuses] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState(new Date());

    const currentLanguage = isHindi ? translations.hi : translations.en;

    useEffect(() => {
      const fetchBusLocations = async () => {
        try {
          setLoading(true);
          // Simulate API call with mock data
          setActiveBuses(mockBusData);
          setLastUpdate(new Date());
        } catch (error) {
          console.error("Error fetching bus locations:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBusLocations();
      const interval = setInterval(fetchBusLocations, 30000);
      return () => clearInterval(interval);
    }, []);

    if (typeof window === 'undefined') {
      return null;
    }

    if (loading && activeBuses.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">{currentLanguage.loading}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div 
          className="rounded-lg p-8 mb-8 text-white"
          style={{ background: 'linear-gradient(to right, #2563eb, #1d4ed8)' }}
        >
          <h1 className="text-3xl font-bold mb-2">{currentLanguage.title}</h1>
          <p className="text-blue-100">{currentLanguage.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">
              {currentLanguage.activeBuses} ({activeBuses.length})
            </h2>

            <div className="space-y-4">
              {activeBuses.map(bus => (
                <BusListItem
                  key={bus.id}
                  bus={bus}
                  onClick={setSelectedBus}
                  isSelected={selectedBus?.id === bus.id}
                />
              ))}
            </div>

            {selectedBus && (
              <BusDetails bus={selectedBus} language={currentLanguage} />
            )}
          </div>
        </div>
      </div>
    );
};

export default BusTracker;
