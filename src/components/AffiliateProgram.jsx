import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  Gift, 
  TrendingUp, 
  UserPlus, 
  Star, 
  Copy, 
  Check,
  Users, 
  Zap
} from 'lucide-react';
import '../styles/AffiliateProgram.css'; // Import the CSS file

const AffiliateProgram = ({ isHindi = false }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('benefits');
  const [referralCode] = useState('HR' + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [stats, setStats] = useState({
    totalAffiliates: 1247,
    totalEarnings: '₹2,345,678',
    averageCommission: '₹1,890'
  });

  const content = {
    headerTitle: isHindi ? 'हमारे सहायक कार्यक्रम में शामिल हों' : 'Join Our Affiliate Program',
    headerDescription: isHindi
      ? 'हमारे साथ साझेदारी करें और दूसरों को हमारी अद्भुत सेवाओं की खोज में मदद करते हुए कमाएं। यह सरल, लाभदायक और एक शानदार अवसर है!'
      : 'Partner with us and earn while you help others discover our amazing services. Its simple, rewarding, and a great opportunity!',
    joinNow: isHindi ? 'अभी शामिल हों' : 'Join Now',
    whyJoin: isHindi ? 'क्यों शामिल हों?' : 'Why Join?',
    benefits: [
      {
        title: isHindi ? 'कमीशन कमाएं' : 'Earn Commission',
        description: isHindi
          ? 'हर रेफ़रल के लिए एक अच्छा कमीशन अर्जित करें।'
          : 'Earn a generous commission for every referral.',
        icon: DollarSign,
        color: 'bg-green-100 text-green-600'
      },
      {
        title: isHindi ? 'विशेष पुरस्कार' : 'Exclusive Rewards',
        description: isHindi
          ? 'जैसे-जैसे आप बढ़ते हैं, विशेष पुरस्कार और लाभ प्राप्त करें।'
          : 'Unlock exclusive rewards and perks as you grow.',
        icon: Gift,
        color: 'bg-purple-100 text-purple-600'
      },
      {
        title: isHindi ? 'मार्केटिंग सामग्री' : 'Marketing Materials',
        description: isHindi
          ? 'बैनर, टेम्पलेट और संसाधनों तक पहुंच प्राप्त करें।'
          : 'Get access to banners, templates, and resources.',
        icon: TrendingUp,
        color: 'bg-blue-100 text-blue-600'
      },
    ],
    tabs: {
      benefits: isHindi ? 'लाभ' : 'Benefits',
      howItWorks: isHindi ? 'कैसे काम करता है' : 'How It Works',
      earnings: isHindi ? 'कमाई' : 'Earnings'
    },
    footerTitle: isHindi ? 'शुरू करने के लिए तैयार हैं?' : 'Ready to get started?',
    signUp: isHindi ? 'सहायक के रूप में साइन अप करें' : 'Sign Up as an Affiliate',
    referralCode: isHindi ? 'आपका रेफरल कोड' : 'Your Referral Code'
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const tabContent = {
    benefits: (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {content.benefits.map((benefit, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-xl shadow-lg text-center ${benefit.color}`}
          >
            <div className="mb-4 flex items-center justify-center">
              <benefit.icon className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
            <p className="text-sm">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    ),
    howItWorks: (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {[
          { 
            title: isHindi ? 'साइन अप करें' : 'Sign Up', 
            description: isHindi 
              ? 'अपना खाता बनाएं और अपना रेफरल कोड प्राप्त करें।' 
              : 'Create your account and get your unique referral code.',
            icon: UserPlus
          },
          { 
            title: isHindi ? 'साझा करें' : 'Share', 
            description: isHindi 
              ? 'अपने रेफरल कोड को दोस्तों और परिवार के साथ साझा करें।' 
              : 'Share your referral code with friends and family.',
            icon: Copy
          },
          { 
            title: isHindi ? 'कमाएं' : 'Earn', 
            description: isHindi 
              ? 'हर सफल रेफरल पर कमीशन प्राप्त करें।' 
              : 'Earn commission on every successful referral.',
            icon: DollarSign
          }
        ].map((step, index) => (
          <div key={index} className="flex items-center space-x-6 bg-blue-50 p-4 rounded-xl">
            <div className="bg-blue-100 p-3 rounded-full">
              <step.icon className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </motion.div>
    ),
    earnings: (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {[
          { 
            title: isHindi ? 'कुल सहयोगी' : 'Total Affiliates', 
            value: stats.totalAffiliates,
            icon: Users
          },
          { 
            title: isHindi ? 'कुल कमाई' : 'Total Earnings', 
            value: stats.totalEarnings,
            icon: DollarSign
          },
          { 
            title: isHindi ? 'औसत कमीशन' : 'Avg. Commission', 
            value: stats.averageCommission,
            icon: Star
          }
        ].map((stat, index) => (
          <div 
            key={index} 
            className="bg-white border-2 border-blue-100 p-6 rounded-xl text-center hover:shadow-lg transition"
          >
            <div className="mb-4 flex items-center justify-center">
              <stat.icon className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-blue-800">{stat.title}</h3>
            <p className="text-2xl font-extrabold text-blue-600">{stat.value}</p>
          </div>
        ))}
      </motion.div>
    )
  };

  return (
    <div className="affiliate-program-container">
      <div className="container mx-auto px-4">
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="header"
        >
          <h1 className="header-title">
            {content.headerTitle}
          </h1>
          <p className="header-description">
            {content.headerDescription}
          </p>
        </motion.header>

        <div className="tabs-container">
          <div className="tabs">
            {Object.entries(content.tabs).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`tab ${activeTab === key ? 'active-tab' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="tabs-content">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="referral-code-container"
        >
          <h2 className="referral-code-title">{content.referralCode}</h2>
          <div className="referral-code-box">
            <div className="referral-code">
              {referralCode}
            </div>
            <button 
              onClick={copyReferralCode}
              className="copy-button"
            >
              {copiedCode ? <Check className="icon" /> : <Copy className="icon" />}
            </button>
          </div>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="footer"
        >
          <h2 className="footer-title">
            {content.footerTitle}
          </h2>
          <button className="sign-up-button">
            <Zap className="icon" />
            <span>{content.signUp}</span>
            <Zap className="icon" />
          </button>
        </motion.footer>
      </div>
    </div>
  );
};

export default AffiliateProgram;