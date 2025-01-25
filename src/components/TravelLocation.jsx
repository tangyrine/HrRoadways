import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Info } from 'lucide-react';

// Import images
import Surajkund from '../assets/Surajkund.jpg';
import Sultanpur_National_Park from '../assets/Sultanpur_National_Park.webp';
import Kurukshetra from '../assets/Kurukshetra.jpg';
import Pinjore_Gardens from '../assets/Pinjore_Gardens.avif';
import Morni_Hills from '../assets/Morni_Hills.webp';
import Gurgaon from '../assets/GURGAON.jpg';
import Panchkula from '../assets/Panchkula.jpg';

const TravelLocations = ({ isHindi }) => {
    const translations = {
        en: {
            title: "Explore Haryana's Cultural Heritage",
            subtitle: "Discover the perfect blend of tradition and modernity",
            searchPlaceholder: "Search locations...",
            categories: [
                { id: 'all', label: 'All Locations' },
                { id: 'nature', label: 'Nature & Wildlife' },
                { id: 'historical', label: 'Historical Sites' },
                { id: 'culture', label: 'Cultural Spots' },
                { id: 'heritage', label: 'Heritage Sites' },
                { id: 'urban', label: 'Urban Explorer' }
            ],
            bestTime: "Best Time to Visit",
            culturalEvents: "Cultural Events",
            localSpecialties: "Local Specialties",
            noLocationsFound: "No locations found matching your criteria.",
            locations: [
                {
                    name: "Sultanpur National Park",
                    description: "A paradise for bird watchers.",
                    image: Sultanpur_National_Park,
                    category: "nature",
                    culturalEvents: ["Bird watching festival in winters"],
                    bestTime: "October to March",
                    localCuisine: ["Bajra Roti", "Lassi"],
                    activities: ["Bird Photography", "Nature Walks"]
                },
                {
                    name: "Kurukshetra",
                    description: "A historical city from Mahabharata.",
                    image: Kurukshetra,
                    category: "historical",
                    culturalEvents: ["Gita Jayanti Mahotsav", "International Gita Festival"],
                    bestTime: "October to March",
                    localCuisine: ["Kheer", "Malpua"],
                    activities: ["Temple Visit", "Museum Tour"]
                },
                {
                    name: "Pinjore Gardens",
                    description: "Beautiful Mughal gardens.",
                    image: Pinjore_Gardens,
                    category: "heritage",
                    culturalEvents: ["Mango Festival", "Garden Tourism Festival"],
                    bestTime: "All year",
                    localCuisine: ["Kadhi Pakora", "Churma"],
                    activities: ["Garden Tours", "Photography"]
                },
                {
                    name: "Morni Hills",
                    description: "Ideal for nature lovers.",
                    image: Morni_Hills,
                    category: "nature",
                    culturalEvents: ["Haryanvi Folk Dance Performances"],
                    bestTime: "March to October",
                    localCuisine: ["Kachri ki Sabzi", "Bathua Raita"],
                    activities: ["Trekking", "Bird Watching"]
                },
                {
                    name: "Surajkund",
                    description: "Famous for its annual crafts fair.",
                    image: Surajkund,
                    category: "culture",
                    culturalEvents: ["Surajkund International Crafts Mela"],
                    bestTime: "February",
                    localCuisine: ["Millet Roti", "Makki ki Roti"],
                    activities: ["Craft Shopping", "Cultural Performances"]
                },
                {
                    name: "Gurgaon",
                    description: "Modern city with rich cultural heritage.",
                    image: Gurgaon,
                    category: "urban",
                    culturalEvents: ["Haryana Day Celebrations"],
                    bestTime: "October to March",
                    localCuisine: ["Desi Ghee Dishes", "Singri ki Sabzi"],
                    activities: ["Shopping", "Food Tours"]
                },
                {
                    name: "Panchkula",
                    description: "Gateway to Shimla hills with rich history.",
                    image: Panchkula,
                    category: "nature",
                    culturalEvents: ["Haryanvi Dance Festival"],
                    bestTime: "September to March",
                    localCuisine: ["Hara Dhania Cholia", "Alsi ki Pinni"],
                    activities: ["Trekking", "Temple Visits"]
                }
            ]
        },
        hi: {
            title: "हरियाणा की सांस्कृतिक विरासत का अन्वेषण करें",
            subtitle: "परंपरा और आधुनिकता का सही मिश्रण खोजें",
            searchPlaceholder: "स्थानों की खोज करें...",
            categories: [
                { id: 'all', label: 'सभी स्थान' },
                { id: 'nature', label: 'प्रकृति और वन्यजीव' },
                { id: 'historical', label: 'ऐतिहासिक स्थल' },
                { id: 'culture', label: 'सांस्कृतिक स्थल' },
                { id: 'heritage', label: 'विरासत स्थल' },
                { id: 'urban', label: 'शहरी अन्वेषण' }
            ],
            bestTime: "यात्रा का सर्वोत्तम समय",
            culturalEvents: "सांस्कृतिक कार्यक्रम",
            localSpecialties: "स्थानीय विशेषताएं",
            noLocationsFound: "आपके मानदंडों से मेल खाने वाले कोई स्थान नहीं मिले।",
            locations: [
                {
                    name: "सुल्तानपुर नेशनल पार्क",
                    description: "पक्षी प्रेमियों के लिए स्वर्ग।",
                    image: Sultanpur_National_Park,
                    category: "nature",
                    culturalEvents: ["सर्दियों में पक्षी देखने का महोत्सव"],
                    bestTime: "अक्टूबर से मार्च",
                    localCuisine: ["बाजरा रोटी", "लस्सी"],
                    activities: ["पक्षी फोटोग्राफी", "प्रकृति में घूमना"]
                },
                {
                    name: "कुरुक्षेत्र",
                    description: "महाभारत का एक ऐतिहासिक शहर।",
                    image: Kurukshetra,
                    category: "historical",
                    culturalEvents: ["गीता जयंती महोत्सव", "अंतर्राष्ट्रीय गीता महोत्सव"],
                    bestTime: "अक्टूबर से मार्च",
                    localCuisine: ["खीर", "मालपुआ"],
                    activities: ["मंदिर यात्रा", "संग्रहालय भ्रमण"]
                },
                {
                    name: "पिंजौर गार्डन",
                    description: "सुंदर मुगल बाग।",
                    image: Pinjore_Gardens,
                    category: "heritage",
                    culturalEvents: ["आम महोत्सव", "गार्डन पर्यटन महोत्सव"],
                    bestTime: "पूरे साल",
                    localCuisine: ["कढ़ी पकोड़ा", "चूरमा"],
                    activities: ["गार्डन टूर", "फोटोग्राफी"]
                },
                {
                    name: "मोरनी हिल्स",
                    description: "प्रकृति प्रेमियों के लिए आदर्श।",
                    image: Morni_Hills,
                    category: "nature",
                    culturalEvents: ["हरियाणवी लोक नृत्य प्रदर्शन"],
                    bestTime: "मार्च से अक्टूबर",
                    localCuisine: ["कचरी की सब्जी", "बथुआ रायता"],
                    activities: ["ट्रेकिंग", "पक्षी देखना"]
                },
                {
                    name: "सूरजकुंड",
                    description: "अपने वार्षिक शिल्प मेले के लिए प्रसिद्ध।",
                    image: Surajkund,
                    category: "culture",
                    culturalEvents: ["सूरजकुंड अंतर्राष्ट्रीय शिल्प मेला"],
                    bestTime: "फरवरी",
                    localCuisine: ["मिलेट रोटी", "मक्की की रोटी"],
                    activities: ["शिल्प खरीदारी", "सांस्कृतिक प्रदर्शन"]
                },
                {
                    name: "गुड़गांव",
                    description: "धनी सांस्कृतिक विरासत वाला आधुनिक शहर।",
                    image: Gurgaon,
                    category: "urban",
                    culturalEvents: ["हरियाणा दिवस समारोह"],
                    bestTime: "अक्टूबर से मार्च",
                    localCuisine: ["देशी घी के व्यंजन", "सिंगरी की सब्जी"],
                    activities: ["खरीदारी", "फूड टूर"]
                },
                {
                    name: "पंचकूला",
                    description: "शिमला की पहाड़ियों के प्रवेश द्वार, समृद्ध इतिहास के साथ।",
                    image: Panchkula,
                    category: "nature",
                    culturalEvents: ["हरियाणवी नृत्य महोत्सव"],
                    bestTime: "सितंबर से मार्च",
                    localCuisine: ["हरा धनिया चोलिया", "अलसी की पिन्नी"],
                    activities: ["ट्रेकिंग", "मंदिर यात्रा"]
                }
            ]
        }
    };

    const [currentLanguage, setCurrentLanguage] = useState(translations.en);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        setCurrentLanguage(isHindi ? translations.hi : translations.en);
    }, [isHindi]);

    const filteredLocations = currentLanguage.locations.filter(location => {
        const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">{currentLanguage.title}</h2>
                    <p className="text-lg text-gray-600">{currentLanguage.subtitle}</p>
                </div>

                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder={currentLanguage.searchPlaceholder}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {currentLanguage.categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                                    selectedCategory === category.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border'
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLocations.map((location, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
                            <div className="relative h-48">
                                <img
                                    src={location.image}
                                    alt={location.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2 text-gray-800">{location.name}</h3>
                                <p className="text-gray-600 mb-4">{location.description}</p>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-gray-800">{currentLanguage.bestTime}</p>
                                            <p className="text-sm text-gray-600">{location.bestTime}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-2">
                                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-gray-800">{currentLanguage.culturalEvents}</p>
                                            <p className="text-sm text-gray-600">{location.culturalEvents.join(', ')}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-gray-800">{currentLanguage.localSpecialties}</p>
                                            <p className="text-sm text-gray-600">{location.localCuisine.join(', ')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {location.activities.map((activity, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                                            {activity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredLocations.length === 0 && (
                    <div className="text-center py-8 bg-white rounded-lg shadow-lg">
                        <p className="text-gray-600">{currentLanguage.noLocationsFound}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TravelLocations;