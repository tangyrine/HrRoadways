// src/components/InfoPage.jsx
import React from 'react';

const InfoPage = ({ isHindi }) => {
    const translations = {
        en: {
            guidelines: "Guidelines",
            passengerRules: "Passenger Rules",
            emergencyNumbers: "Emergency Numbers",
            privacyPolicy: "Privacy Policy",
            guidelinesContent: "Here are some general guidelines for using our services...",
            passengerRulesContent: "Please follow these rules to ensure a safe and pleasant journey...",
            privacyPolicyContent: "Our privacy policy outlines how we handle your personal information...",
            emergencyNumbersList: [
                { name: "Police", number: "100" },
                { name: "Fire Brigade", number: "101" },
                { name: "Ambulance", number: "102" }
            ]
        },
        hi: {
            guidelines: "दिशा-निर्देश",
            passengerRules: "यात्री नियम",
            emergencyNumbers: "आपातकालीन नंबर",
            privacyPolicy: "गोपनीयता नीति",
            guidelinesContent: "हमारी सेवाओं का उपयोग करने के लिए यहां कुछ सामान्य दिशा-निर्देश दिए गए हैं...",
            passengerRulesContent: "सुरक्षित और सुखद यात्रा सुनिश्चित करने के लिए कृपया इन नियमों का पालन करें...",
            privacyPolicyContent: "हमारी गोपनीयता नीति यह बताती है कि हम आपकी व्यक्तिगत जानकारी को कैसे संभालते हैं...",
            emergencyNumbersList: [
                { name: "पुलिस", number: "100" },
                { name: "फायर ब्रिगेड", number: "101" },
                { name: "एम्बुलेंस", number: "102" }
            ]
        }
    };

    const currentLanguage = isHindi ? translations.hi : translations.en;

    return (
        <div className="info-page">
            <section>
                <h2>{currentLanguage.guidelines}</h2>
                <p>{currentLanguage.guidelinesContent}</p>
            </section>
            <section>
                <h2>{currentLanguage.passengerRules}</h2>
                <p>{currentLanguage.passengerRulesContent}</p>
            </section>
            <section>
                <h2>{currentLanguage.emergencyNumbers}</h2>
                <ul>
                    {currentLanguage.emergencyNumbersList.map((item, index) => (
                        <li key={index}>{item.name}: {item.number}</li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>{currentLanguage.privacyPolicy}</h2>
                <p>{currentLanguage.privacyPolicyContent}</p>
            </section>
        </div>
    );
};

export default InfoPage;