import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  MapPin, 
  Shield, 
  Phone, 
  Mail, 
  CreditCard, 
  Headphones, 
  AlertTriangle, 
  Lock, 
  Hammer,
  MessageCircle,
  HelpCircle,
  Star,
  ClipboardList,
  Download,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2
} from 'lucide-react';

const InfoPage = ({ initialLanguage = 'en' }) => {
  const [language, setLanguage] = useState(initialLanguage);
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedFAQs, setExpandedFAQs] = useState({});
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const translations = {
    en: {
      header: {
        title: "Traveler's Companion",
        subtitle: "Your Ultimate Travel Support Platform"
      },
      sections: {
        overview: "Travel Overview",
        guidelines: "Travel Guidelines",
        emergencySupport: "Emergency Support",
        privacyPolicy: "Privacy Protection",
        customerCare: "Customer Care"
      },
      overviewContent: {
        description: "A comprehensive platform designed to ensure safe, comfortable, and seamless travel experiences for all passengers.",
        keyFeatures: [
          "24/7 Real-time Support",
          "Multilingual Assistance",
          "Comprehensive Safety Protocols",
          "Transparent Communication"
        ]
      },
      faqs: [
        {
          question: "How can I book a ticket?",
          answer: "Visit our website or mobile app, select your route, choose seats, and complete payment. Easy and quick!"
        },
        {
          question: "What safety measures are in place?",
          answer: "We follow strict COVID-19 protocols, sanitize vehicles, enforce mask wearing, and maintain social distancing."
        },
        {
          question: "Can I change my ticket?",
          answer: "Yes, tickets can be modified up to 2 hours before departure with a nominal change fee."
        }
      ],
      emergencySections: [
        {
          title: "Medical Support",
          description: "Immediate medical assistance and coordination with local healthcare facilities.",
          icon: <Headphones />
        },
        {
          title: "Legal Protection",
          description: "Comprehensive legal support and guidance during travel emergencies.",
          icon: <Shield />
        },
        {
          title: "Financial Assistance",
          description: "Emergency financial support and travel insurance coordination.",
          icon: <CreditCard />
        }
      ],
      supportForm: {
        title: "Need Immediate Assistance?",
        namePlaceholder: "Your Name",
        emailPlaceholder: "Your Email",
        messagePlaceholder: "Describe your issue",
        submitButton: "Send Support Request"
      }
    },
    hi: {
      // Similar structure with Hindi translations
      header: {
        title: "यात्री का साथी",
        subtitle: "आपका सर्वोत्तम यात्रा सहायता प्लेटफॉर्म"
      },
      // ... (rest of the Hindi translations would follow the same pattern)
    }
  };

  const currentTranslation = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const toggleFAQ = (index) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSupportFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    // Implement support request logic
    console.log('Support Request Submitted', formData);
    setSupportModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Globe className="text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-blue-600">
              {currentTranslation.header.title}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200 transition"
            >
              {language === 'en' ? 'हिं' : 'EN'}
            </button>
            <button 
              onClick={() => setSupportModalOpen(true)}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
            >
              <Headphones className="mr-2" /> Support
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="pt-20 max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1 bg-white rounded-xl shadow-md p-4 sticky top-24 h-fit">
          {Object.entries(currentTranslation.sections).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`w-full text-left p-3 rounded-lg mb-2 flex items-center transition ${
                activeSection === key 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-blue-100 text-gray-700'
              }`}
            >
              {key === 'overview' && <MapPin className="mr-3" />}
              {key === 'guidelines' && <ClipboardList className="mr-3" />}
              {key === 'emergencySupport' && <AlertTriangle className="mr-3" />}
              {key === 'privacyPolicy' && <Lock className="mr-3" />}
              {key === 'customerCare' && <Headphones className="mr-3" />}
              {label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 bg-white rounded-xl shadow-md p-6">
          {activeSection === 'overview' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">
                {currentTranslation.header.subtitle}
              </h2>
              <p className="text-gray-700 mb-6">
                {currentTranslation.overviewContent.description}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {currentTranslation.overviewContent.keyFeatures.map((feature, index) => (
                  <div 
                    key={index} 
                    className="bg-blue-50 p-4 rounded-lg flex items-center hover:shadow-md transition"
                  >
                    <Star className="text-blue-600 mr-3" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'guidelines' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">
                Frequently Asked Questions
              </h2>
              {currentTranslation.faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border-b py-4 cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                    {expandedFAQs[index] ? <ChevronUp /> : <ChevronDown />}
                  </div>
                  {expandedFAQs[index] && (
                    <p className="mt-2 text-gray-600 animate-fade-in">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeSection === 'emergencySupport' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">
                Emergency Support Services
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {currentTranslation.emergencySections.map((section, index) => (
                  <div 
                    key={index} 
                    className="bg-blue-50 p-6 rounded-xl text-center hover:shadow-lg transition"
                  >
                    <div className="flex justify-center mb-4 text-blue-600">
                      {section.icon}
                    </div>
                    <h3 className="font-bold text-xl mb-3">{section.title}</h3>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Support Modal */}
      {supportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {currentTranslation.supportForm.title}
            </h2>
            <form onSubmit={handleSupportSubmit}>
              <input
                type="text"
                name="name"
                placeholder={currentTranslation.supportForm.namePlaceholder}
                value={formData.name}
                onChange={handleSupportFormChange}
                className="w-full p-3 border rounded-lg mb-4"
                required
              />
              <input
                type="email"
                name="email"
                placeholder={currentTranslation.supportForm.emailPlaceholder}
                value={formData.email}
                onChange={handleSupportFormChange}
                className="w-full p-3 border rounded-lg mb-4"
                required
              />
              <textarea
                name="message"
                placeholder={currentTranslation.supportForm.messagePlaceholder}
                value={formData.message}
                onChange={handleSupportFormChange}
                className="w-full p-3 border rounded-lg mb-4 h-32"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
              >
                {currentTranslation.supportForm.submitButton}
                <ArrowRight className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPage;