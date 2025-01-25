import React, { useState, useEffect } from "react";

const FAQ = ({ isHindi }) => {
  const translations = {
    en: {
      title: "Frequently Asked Questions",
      faqData: [
        {
          question: "What is Haryana Roadways?",
          answer:
            "Haryana Roadways is a state-owned bus service that connects various cities and towns in Haryana and neighboring states. It is known for its punctuality and affordable fares.",
        },
        {
          question: "How can I book a ticket?",
          answer:
            "You can book a ticket online through the official Haryana Roadways website or visit a local bus station to purchase a ticket in person. Online booking is recommended for a hassle-free experience.",
        },
        {
          question: "What are the popular routes?",
          answer:
            "Some of the popular routes covered by Haryana Roadways include Chandigarh to Delhi, Rohtak to Hisar, and Gurgaon to Ambala. These routes are frequented by commuters and tourists alike.",
        },
        {
          question: "Can I travel without an account?",
          answer:
            "Yes, you can travel without creating an account. However, having an account allows you to track your bookings, receive updates on bus schedules, and avail of exclusive offers.",
        },
        {
          question: "How to plan journeys with Haryana Roadways?",
          answer:
            "To plan your journey with Haryana Roadways, visit the official website and enter your origin and destination cities, travel dates, and the number of passengers. The website will display available options and timings for your trip.",
        },
      ],
    },
    hi: {
      title: "बार-बार पूछे जाने वाले प्रश्न",
      faqData: [
        {
          question: "हरियाणा रोडवेज क्या है?",
          answer:
            "हरियाणा रोडवेज एक राज्य-स्वामित्व वाली बस सेवा है जो हरियाणा और पड़ोसी राज्यों के विभिन्न शहरों और कस्बों को जोड़ती है। यह अपनी समयबद्धता और सस्ती किराया दरों के लिए जानी जाती है।",
        },
        {
          question: "मैं टिकट कैसे बुक कर सकता हूँ?",
          answer:
            "आप आधिकारिक हरियाणा रोडवेज वेबसाइट के माध्यम से ऑनलाइन टिकट बुक कर सकते हैं या किसी स्थानीय बस स्टेशन पर जाकर व्यक्तिगत रूप से टिकट खरीद सकते हैं। परेशानी मुक्त अनुभव के लिए ऑनलाइन बुकिंग की सिफारिश की जाती है।",
        },
        {
          question: "लोकप्रिय मार्ग क्या हैं?",
          answer:
            "हरियाणा रोडवेज द्वारा कवर किए गए कुछ लोकप्रिय मार्गों में चंडीगढ़ से दिल्ली, रोहतक से हिसार, और गुड़गांव से अंबाला शामिल हैं। ये मार्ग यात्रियों और पर्यटकों दोनों के बीच लोकप्रिय हैं।",
        },
        {
          question: "क्या मैं बिना खाता बनाए यात्रा कर सकता हूँ?",
          answer:
            "हाँ, आप खाता बनाए बिना यात्रा कर सकते हैं। हालांकि, खाता होने से आप अपनी बुकिंग को ट्रैक कर सकते हैं, बस शेड्यूल पर अपडेट प्राप्त कर सकते हैं और विशेष ऑफ़र प्राप्त कर सकते हैं।",
        },
        {
          question: "हरियाणा रोडवेज के साथ यात्राएं कैसे योजना बनाएं?",
          answer:
            "हरियाणा रोडवेज के साथ अपनी यात्रा की योजना बनाने के लिए, आधिकारिक वेबसाइट पर जाएं और अपनी उत्पत्ति और गंतव्य शहरों, यात्रा की तारीखों और यात्रियों की संख्या दर्ज करें। वेबसाइट आपके यात्रा के लिए उपलब्ध विकल्पों और समय को प्रदर्शित करेगी।",
        },
      ],
    },
  };

  const [currentLanguage, setCurrentLanguage] = useState(translations.en);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    setCurrentLanguage(isHindi ? translations.hi : translations.en);
  }, [isHindi]);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto mb-9 p-10 rounded-lg">
      <h1 className="text-5xl font-bold text-center mb-10 mt-12">
        {currentLanguage.title}
      </h1>
      <div className="faq-section flex flex-col space-y-6">
        {currentLanguage.faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 transition-all hover:shadow-lg"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <h2 className="text-xl font-semibold text-gray-800 hover:text-cyan-700">
                {faq.question}
              </h2>
              {/* Arrow SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {activeIndex === index && (
              <p className="mt-3 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;