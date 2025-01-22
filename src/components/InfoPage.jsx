import React from 'react';
import '../assets/infoPage.css';

const InfoPage = ({ isHindi }) => {
    const translations = {
        en: {
            guidelines: "Guidelines",
            passengerRules: "Passenger Rules",
            emergencyNumbers: "Emergency Numbers",
            privacyPolicy: "Privacy Policy",
            guidelinesContent: `
            To ensure a safe and pleasant journey, passengers are requested to follow these guidelines:

            **General Rules:**
            - Carry a valid ticket or pass at all times. Tickets may be checked during the journey.
            - Arrive at the boarding point at least 15 minutes before departure.
            - Maintain cleanliness; avoid littering in or around the bus.
            - Respect other passengers by avoiding loud conversations or playing music without headphones.

            **Rules for Different Bus Types:**
            - **AC Buses**: Keep windows closed to maintain the air conditioning. Avoid blocking the AC vents.
            - **Non-AC Buses**: Carry water and stay hydrated, especially during summer travel.
            - **Sleeper Buses**: Do not occupy another passenger’s berth or sit on the edges of berths. Use provided bedding responsibly.
            - **Sitting Buses**: Avoid keeping luggage in the aisle or on seats reserved for passengers.

            **Luggage and Personal Belongings:**
            - Store larger luggage in the designated compartments. Overhead racks are for small bags only.
            - Keep valuables such as wallets, phones, and jewelry with you at all times.

            **Safety Rules:**
            - Remain seated while the bus is in motion. Use seat belts where available.
            - Avoid unnecessary conversations with the driver or distractions near the driver’s area.
            - In case of an emergency, use the designated exit and follow the staff's instructions.

            **Other Guidelines:**
            - Smoking, drinking alcohol, or consuming tobacco is strictly prohibited on the bus.
            - Pets are allowed only if permitted by the service provider and must be kept in carriers.

            Your cooperation ensures a smooth and comfortable journey for everyone.
        `,
            passengerRulesContent: `
            As a bus passenger, you are expected to follow these rules:

            1. Show respect to fellow passengers, drivers, and staff members.
            2. Do not damage or tamper with bus property.
            3. Follow the seating arrangements as per your ticket.
            4. Ensure your luggage does not inconvenience others.
            5. Report any suspicious activities to the bus staff or authorities.

            By adhering to these rules, you contribute to a safe and enjoyable travel experience.
        `,
            privacyPolicyContent: `
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.

            **1. Information We Collect:**
            - **Personal Information**: Name, contact number, email address, and other details provided during ticket booking or registration.
            - **Payment Information**: Debit/credit card details or UPI information for processing payments. We do not store payment information; it is securely processed by third-party payment gateways.
            - **Travel Details**: Booking history, travel preferences, and feedback.
            - **Device Information**: IP address, browser type, and device details collected to enhance your experience.

            **2. How We Use Your Information:**
            - To process ticket bookings and provide travel-related services.
            - To notify you about schedule changes, offers, and promotions.
            - To enhance user experience and improve our services.
            - To comply with legal and regulatory requirements.

            **3. Information Sharing:**
            - We do not sell or share your personal information with third parties, except:
              - To service providers (e.g., payment gateways, SMS/email notification services) who assist in delivering our services.
              - If required by law or for legal proceedings.
              - To prevent fraud or security threats.

            **4. Data Security:**
            - We implement strong security measures to protect your data, including encryption, firewalls, and secure servers.
            - However, no online data transmission or storage is entirely secure, so please use our services at your own discretion.

            **5. Your Rights:**
            - Access and update your personal information through your account.
            - Request deletion of your data unless it is required to fulfill legal obligations.
            - Opt-out of promotional communications via the provided unsubscribe link or by contacting us.

            **6. Cookies:**
            - We use cookies to improve your experience on our website. You can manage cookie preferences through your browser settings.

            **7. Third-Party Links:**
            - Our website may contain links to third-party sites. We are not responsible for their privacy practices or content. Please review their policies before sharing your information.

            **8. Contact Us:**
            - For privacy-related questions or concerns, contact us at privacy@yourcompany.com or call our helpline at +91-XXXXXXXXXX.

            By using our services, you agree to this Privacy Policy. We reserve the right to update it periodically. Please check our website for the latest version.
        `,
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
            guidelinesContent: `
            सुरक्षित और सुखद यात्रा सुनिश्चित करने के लिए कृपया इन दिशा-निर्देशों का पालन करें:

            **सामान्य नियम:**
            - हमेशा वैध टिकट या पास साथ रखें। यात्रा के दौरान टिकट की जांच की जा सकती है।
            - प्रस्थान से कम से कम 15 मिनट पहले बोर्डिंग पॉइंट पर पहुंचें।
            - स्वच्छता बनाए रखें; बस के अंदर या आसपास कचरा न फैलाएं।
            - तेज आवाज में बातचीत करने या हेडफ़ोन के बिना संगीत बजाने से बचें।

            **विभिन्न बस प्रकारों के लिए नियम:**
            - **एसी बसें**: एसी बनाए रखने के लिए खिड़कियां बंद रखें। एसी वेंट को अवरुद्ध न करें।
            - **नॉन-एसी बसें**: पानी साथ रखें और गर्मियों के दौरान हाइड्रेटेड रहें।
            - **स्लीपर बसें**: किसी अन्य यात्री की बर्थ पर कब्जा न करें या बर्थ के किनारों पर न बैठें। दी गई चादरों का जिम्मेदारी से उपयोग करें।
            - **सिटिंग बसें**: गलियारे में सामान न रखें या यात्रियों के लिए आरक्षित सीटों पर सामान न रखें।

            **सामान और व्यक्तिगत वस्तुएं:**
            - बड़े सामान को निर्दिष्ट कम्पार्टमेंट में रखें। ओवरहेड रैक केवल छोटे बैग के लिए हैं।
            - वॉलेट, फोन, और आभूषण जैसी कीमती चीजों को हमेशा अपने पास रखें।

            **सुरक्षा नियम:**
            - बस के चलने के दौरान अपनी सीट पर बने रहें। जहां उपलब्ध हो, सीट बेल्ट का उपयोग करें।
            - ड्राइवर से अनावश्यक बातचीत या ड्राइवर के क्षेत्र के पास ध्यान भटकाने से बचें।
            - आपात स्थिति में, निर्दिष्ट निकास का उपयोग करें और कर्मचारियों के निर्देशों का पालन करें।

            **अन्य दिशा-निर्देश:**
            - बस में धूम्रपान, शराब पीना, या तंबाकू का सेवन सख्त वर्जित है।
            - केवल सेवा प्रदाता द्वारा अनुमत होने पर ही पालतू जानवर लाए जा सकते हैं और उन्हें कैरियर में रखना होगा।

            आपका सहयोग सभी के लिए एक सहज और आरामदायक यात्रा सुनिश्चित करता है।
        `,
            passengerRulesContent: `
            एक बस यात्री के रूप में, आपसे इन नियमों का पालन करने की अपेक्षा की जाती है:

            1. सहयात्रियों, ड्राइवरों, और कर्मचारियों के प्रति सम्मान दिखाएं।
            2. बस की संपत्ति को नुकसान न पहुंचाएं या छेड़छाड़ न करें।
            3. अपने टिकट के अनुसार बैठने की व्यवस्था का पालन करें।
            4. सुनिश्चित करें कि आपका सामान दूसरों को असुविधा न पहुंचाए।
            5. किसी भी संदिग्ध गतिविधियों की जानकारी बस कर्मचारियों या अधिकारियों को दें।

            इन नियमों का पालन करके, आप एक सुरक्षित और सुखद यात्रा अनुभव में योगदान करते हैं।
        `,
            privacyPolicyContent: `
            आपकी गोपनीयता हमारे लिए महत्वपूर्ण है। यह गोपनीयता नीति यह बताती है कि जब आप हमारी सेवाओं का उपयोग करते हैं, तो हम आपकी व्यक्तिगत जानकारी को कैसे एकत्रित, उपयोग और सुरक्षित करते हैं।

            **1. हम कौन-सी जानकारी एकत्र करते हैं:**
            - **व्यक्तिगत जानकारी**: नाम, संपर्क नंबर, ईमेल पता, और टिकट बुकिंग या पंजीकरण के दौरान दी गई अन्य जानकारी।
            - **भुगतान जानकारी**: भुगतान प्रोसेसिंग के लिए डेबिट/क्रेडिट कार्ड विवरण या यूपीआई जानकारी। हम भुगतान जानकारी को संग्रहीत नहीं करते; यह सुरक्षित रूप से तीसरे पक्ष के भुगतान गेटवे द्वारा प्रोसेस की जाती है।
            - **यात्रा विवरण**: बुकिंग इतिहास, यात्रा प्राथमिकताएं, और फीडबैक।
            - **डिवाइस जानकारी**: आपके अनुभव को बेहतर बनाने के लिए आईपी एड्रेस, ब्राउज़र प्रकार, और डिवाइस विवरण।

            **2. हम आपकी जानकारी का उपयोग कैसे करते हैं:**
            - टिकट बुकिंग प्रोसेस करने और यात्रा सेवाएं प्रदान करने के लिए।
            - शेड्यूल बदलाव, ऑफ़र, और प्रचार के बारे में सूचित करने के लिए।
            - उपयोगकर्ता अनुभव को बढ़ाने और हमारी सेवाओं में सुधार करने के लिए।
            - कानूनी और नियामक आवश्यकताओं का पालन करने के लिए।

            **3. जानकारी साझा करना:**
            - हम आपकी व्यक्तिगत जानकारी को तीसरे पक्षों को नहीं बेचते या साझा नहीं करते, सिवाय:
              - सेवा प्रदाताओं (जैसे भुगतान गेटवे, एसएमएस/ईमेल सूचना सेवाओं) के लिए जो हमारी सेवाएं प्रदान करने में सहायता करते हैं।
              - यदि कानून द्वारा आवश्यक हो या कानूनी कार्यवाही के लिए।
              - धोखाधड़ी या सुरक्षा खतरों को रोकने के लिए।

            **4. डेटा सुरक्षा:**
            - हम आपके डेटा की सुरक्षा के लिए मजबूत सुरक्षा उपाय लागू करते हैं, जिसमें एन्क्रिप्शन, फ़ायरवॉल और सुरक्षित सर्वर शामिल हैं।
            - हालांकि, कोई भी ऑनलाइन डेटा ट्रांसमिशन या भंडारण पूरी तरह से सुरक्षित नहीं है, इसलिए कृपया अपनी समझदारी से हमारी सेवाओं का उपयोग करें।

            **5. आपके अधिकार:**
            - अपने खाते के माध्यम से अपनी व्यक्तिगत जानकारी का उपयोग और अपडेट करें।
            - अपनी जानकारी को हटाने का अनुरोध करें, जब तक कि इसे कानूनी दायित्वों को पूरा करने के लिए आवश्यक न हो।
            - प्रचार संचार से बाहर निकलें, प्रदान किए गए अनसब्सक्राइब लिंक के माध्यम से या हमसे संपर्क करके।

            **6. कुकीज:**
            - हम आपके अनुभव को बेहतर बनाने के लिए कुकीज़ का उपयोग करते हैं। आप अपने ब्राउज़र सेटिंग्स के माध्यम से कुकी प्राथमिकताएं प्रबंधित कर सकते हैं।

            **7. तृतीय-पक्ष लिंक:**
            - हमारी वेबसाइट में तृतीय-पक्ष साइटों के लिंक हो सकते हैं। हम उनकी गोपनीयता प्रथाओं या सामग्री के लिए जिम्मेदार नहीं हैं। कृपया उनकी नीतियों की समीक्षा करें।

            **8. संपर्क करें:**
            - गोपनीयता से संबंधित प्रश्नों या चिंताओं के लिए, हमसे privacy@yourcompany.com पर संपर्क करें या हमारी हेल्पलाइन +91-XXXXXXXXXX पर कॉल करें।

            हमारी सेवाओं का उपयोग करके, आप इस गोपनीयता नीति से सहमत हैं। हम इसे समय-समय पर अपडेट करने का अधिकार सुरक्षित रखते हैं। नवीनतम संस्करण के लिए कृपया हमारी वेबसाइट देखें।
        `,
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
            <header className="info-header">
                <h1>Travel Guide</h1>
                <p>Guidelines to make your journey safe and enjoyable</p>
            </header>
            <div className="info-content">
                <div className="info-card">
                    <section>
                        <h2>{currentLanguage.guidelines}</h2>
                        <p>{currentLanguage.guidelinesContent}</p>
                    </section>
                </div>
                <div className="info-card">
                    <section>
                        <h2>{currentLanguage.passengerRules}</h2>
                        <p>{currentLanguage.passengerRulesContent}</p>
                    </section>
                </div>
            </div>
            <section>
                <h2>{currentLanguage.emergencyNumbers}</h2>
                <ul>
                    {currentLanguage.emergencyNumbersList.map((item, index) => (
                        <li key={index}>{item.name}: {item.number}</li>
                    ))}
                </ul>
            </section>
            <section className="privacy-policy">
                <h2>{currentLanguage.privacyPolicy}</h2>
                <p>{currentLanguage.privacyPolicyContent}</p>
            </section>
        </div>
    );
};

export default InfoPage;