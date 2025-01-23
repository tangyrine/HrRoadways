import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Search } from 'lucide-react';

const SearchWindow = ({ isOpen, onClose, isHindi }) => {
  const [filters, setFilters] = useState({
    fromLocation: '',
    toLocation: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const translations = {
    en: {
      title: "Search Bus Routes",
      from: "From",
      to: "To",
      date: "Travel Date",
      search: "Search Routes",
      fromPlaceholder: "Enter departure city",
      toPlaceholder: "Enter destination city"
    },
    hi: {
      title: "बस मार्ग खोजें",
      from: "से",
      to: "तक",
      date: "यात्रा की तारीख",
      search: "मार्ग खोजें",
      fromPlaceholder: "प्रस्थान शहर दर्ज करें",
      toPlaceholder: "गंतव्य शहर दर्ज करें"
    }
  };

  const currentLanguage = isHindi ? translations.hi : translations.en;

  const handleSearch = () => {
    window.location.href = `/schedule?from=${filters.fromLocation}&to=${filters.toLocation}&date=${filters.date}`;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        className="relative bg-white rounded-lg shadow-lg w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {currentLanguage.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={currentLanguage.fromPlaceholder}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={filters.fromLocation}
                onChange={(e) => setFilters({ ...filters, fromLocation: e.target.value })}
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={currentLanguage.toPlaceholder}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={filters.toLocation}
                onChange={(e) => setFilters({ ...filters, toLocation: e.target.value })}
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <Search size={20} />
            {currentLanguage.search}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchWindow;