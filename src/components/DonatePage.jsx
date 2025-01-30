import React, { useState } from 'react';
import { Heart, Bus, CreditCard, Calendar, Mail, CheckCircle, Clock, Users } from 'lucide-react';

const translations = {
  en: {
    headerTitle: "Haryana Roadways",
    headerSubtitle: "Your Journey, Our Pride",
    supportTitle: "Support Our Mission",
    selectAmountLabel: "Select Donation Amount (INR)",
    customAmountPlaceholder: "Custom Amount",
    oneTime: "One-time",
    monthly: "Monthly",
    fullNameLabel: "Full Name",
    emailLabel: "Email",
    phoneNumberLabel: "Phone Number",
    panCardLabel: "PAN Card (for tax benefits)",
    messageLabel: "Message (Optional)",
    messagePlaceholder: "Share why you're supporting us...",
    paymentMethodLabel: "Payment Method",
    completeDonation: "Complete Donation",
    yourImpactTitle: "Your Impact",
    busesImpact: "100+ Buses",
    busesImpactDetail: "Maintained monthly",
    passengersImpact: "50,000+ Passengers",
    passengersImpactDetail: "Served daily",
    serviceImpact: "24/7 Service",
    serviceImpactDetail: "Round the clock operations",
    recentSupportersTitle: "Recent Supporters",
    taxBenefitsTitle: "Tax Benefits",
    taxBenefitsDetail: "All donations are eligible for tax deduction under Section 80G of the Income Tax Act. You will receive a tax receipt via email.",
    thankYouTitle: "Thank You for Your Donation!",
    thankYouMessage: "Your generous contribution will help us improve our services and infrastructure. A confirmation email has been sent to",
    makeAnotherDonation: "Make Another Donation"
  },
  hi: {
    headerTitle: "हरियाणा रोडवेज",
    headerSubtitle: "आपकी यात्रा, हमारा गर्व",
    supportTitle: "हमारे मिशन का समर्थन करें",
    selectAmountLabel: "दान राशि चुनें (INR)",
    customAmountPlaceholder: "कस्टम राशि",
    oneTime: "एक बार",
    monthly: "मासिक",
    fullNameLabel: "पूरा नाम",
    emailLabel: "ईमेल",
    phoneNumberLabel: "फोन नंबर",
    panCardLabel: "पैन कार्ड (कर लाभ के लिए)",
    messageLabel: "संदेश (वैकल्पिक)",
    messagePlaceholder: "आप हमारे समर्थन क्यों कर रहे हैं, साझा करें...",
    paymentMethodLabel: "भुगतान विधि",
    completeDonation: "दान पूरा करें",
    yourImpactTitle: "आपका प्रभाव",
    busesImpact: "100+ बसें",
    busesImpactDetail: "मासिक रखरखाव",
    passengersImpact: "50,000+ यात्री",
    passengersImpactDetail: "प्रतिदिन सेवा",
    serviceImpact: "24/7 सेवा",
    serviceImpactDetail: "घड़ी के चारों ओर संचालन",
    recentSupportersTitle: "हाल के समर्थक",
    taxBenefitsTitle: "कर लाभ",
    taxBenefitsDetail: "सभी दान आयकर अधिनियम की धारा 80G के तहत कर कटौती के लिए पात्र हैं। आपको ईमेल के माध्यम से एक कर रसीद प्राप्त होगी।",
    thankYouTitle: "आपके दान के लिए धन्यवाद!",
    thankYouMessage: "आपके उदार योगदान से हमें अपनी सेवाओं और बुनियादी ढांचे में सुधार करने में मदद मिलेगी। एक पुष्टिकरण ईमेल भेजा गया है",
    makeAnotherDonation: "एक और दान करें"
  }
};

const DonatePage = ({ isHindi }) => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    panCard: '',
    message: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isMonthly, setIsMonthly] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const predefinedAmounts = [100, 500, 1000, 5000];
  const [recentDonors] = useState([
    { name: "Rahul S.", amount: 1000, message: "Keep up the great work!" },
    { name: "Priya M.", amount: 500, message: "Happy to support" },
    { name: "Amit K.", amount: 2000, message: "For better transportation" }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowThankYou(true);
  };

  const handleAmountSelect = (value) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmount = (e) => {
    setCustomAmount(e.target.value);
    setAmount('custom');
  };

  const currentLanguage = isHindi ? translations.hi : translations.en;

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gray-50">
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
          .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        `}</style>

        <header className="bg-blue-900 text-white py-8 animate-fade-in">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
              <Bus size={32} />
              {currentLanguage.headerTitle}
            </h1>
            <p className="mt-2">{currentLanguage.headerSubtitle}</p>
          </div>
        </header>

        <div className="max-w-2xl mx-auto mt-16 p-8 bg-white rounded-lg shadow-xl text-center animate-slide-up">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6 animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentLanguage.thankYouTitle}</h2>
          <p className="text-gray-600 mb-6">
            {currentLanguage.thankYouMessage} {donorInfo.email}.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
          >
            {currentLanguage.makeAnotherDonation}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        
        .hover-scale {
          transition: transform 0.2s ease-in-out;
        }
        .hover-scale:hover {
          transform: scale(1.02);
        }
      `}</style>

      <header className="bg-blue-900 text-white py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Bus size={32} />
            {currentLanguage.headerTitle}
          </h1>
          <p className="mt-2">{currentLanguage.headerSubtitle}</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 hover-scale transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Heart className="text-red-500 animate-bounce" />
                {currentLanguage.supportTitle}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    {currentLanguage.selectAmountLabel}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {predefinedAmounts.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleAmountSelect(value)}
                        className={`py-3 px-4 rounded-lg border text-center transition-all duration-300 hover:scale-105 ${
                          amount === value
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:shadow-md'
                        }`}
                      >
                        ₹{value}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <input
                      type="number"
                      placeholder={currentLanguage.customAmountPlaceholder}
                      value={customAmount}
                      onChange={handleCustomAmount}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-300"
                      min="50"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsMonthly(false)}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                      !isMonthly
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                    }`}
                  >
                    {currentLanguage.oneTime}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMonthly(true)}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                      isMonthly
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                    }`}
                  >
                    {currentLanguage.monthly}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {currentLanguage.fullNameLabel}
                    </label>
                    <input
                      type="text"
                      value={donorInfo.name}
                      placeholder={currentLanguage.fullNameLabel}
                      onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {currentLanguage.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={donorInfo.email}
                      placeholder={currentLanguage.emailLabel}
                      onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {currentLanguage.phoneNumberLabel}
                    </label>
                    <input
                      type="tel"
                      value={donorInfo.phone}
                      placeholder={currentLanguage.phoneNumberLabel}
                      onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-300"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {currentLanguage.panCardLabel}
                    </label>
                    <input
                      type="text"
                      value={donorInfo.panCard}
                      placeholder={currentLanguage.panCardLabel}
                      onChange={(e) => setDonorInfo({...donorInfo, panCard: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {currentLanguage.messageLabel}
                  </label>
                  <textarea
                    value={donorInfo.message}
                    onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 transition-all duration-200 hover:border-blue-300"
                    placeholder={currentLanguage.messagePlaceholder}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    {currentLanguage.paymentMethodLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`py-3 px-4 rounded-lg border flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${
                        paymentMethod === 'card'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                      }`}
                    >
                      <CreditCard size={20} />
                      {isHindi ? "कार्ड" : "Card"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`py-3 px-4 rounded-lg border transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${
                        paymentMethod === 'upi'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                      }`}
                    >
                      {isHindi ? "यूपीआई" : "UPI"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`py-3 px-4 rounded-lg border transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${
                        paymentMethod === 'netbanking'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                      }`}
                    >
                      {isHindi ? "नेट बैंकिंग" : "Net Banking"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Heart size={20} className="animate-bounce" />
                  {currentLanguage.completeDonation}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 hover-scale transition-all duration-300 hover:shadow-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{currentLanguage.yourImpactTitle}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <Bus className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <p className="font-semibold">{currentLanguage.busesImpact}</p>
                    <p className="text-sm text-gray-600">{currentLanguage.busesImpactDetail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <Users className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <p className="font-semibold">{currentLanguage.passengersImpact}</p>
                    <p className="text-sm text-gray-600">{currentLanguage.passengersImpactDetail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <Clock className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <p className="font-semibold">{currentLanguage.serviceImpact}</p>
                    <p className="text-sm text-gray-600">{currentLanguage.serviceImpactDetail}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover-scale transition-all duration-300 hover:shadow-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{currentLanguage.recentSupportersTitle}</h3>
              <div className="space-y-4">
                {recentDonors.map((donor, index) => (
                  <div 
                    key={index} 
                    className="border-b last:border-0 pb-3 last:pb-0 transition-all duration-200 hover:bg-gray-50 px-2 rounded"
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{donor.name}</p>
                      <p className="text-blue-600">₹{donor.amount}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{donor.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover-scale transition-all duration-300 hover:shadow-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentLanguage.taxBenefitsTitle}</h3>
              <p className="text-gray-600 text-sm">
                {currentLanguage.taxBenefitsDetail}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonatePage;
