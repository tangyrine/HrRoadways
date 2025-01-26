import React, { useState, useEffect } from "react";
import "../styles/ContactUs.css";

const ContactUs = ({ isHindi }) => {
    const translations = {
        en: {
            header: {
                title: "Contact Us",
                subtitle: "Need help? Feel free to reach out to us. We’re here to assist you with any queries related to your journey or our services."
            },
            contactNumbers: {
                title: "📞 Contact Numbers",
                customerSupport: "Customer Support",
                bookingAssistance: "Booking Assistance",
                emailSupport: "Email Support"
            },
            officeTimings: {
                title: "⏰ Office Timings",
                weekdays: "Monday - Friday",
                saturday: "Saturday",
                sunday: "Sunday",
                closed: "Closed"
            },
            officeLocations: {
                title: "📍 Office Locations",
                chandigarh: "Chandigarh Office",
                delhi: "Delhi Office",
                gurgaon: "Gurgaon Office"
            }
        },
        hi: {
            header: {
                title: "संपर्क करें",
                subtitle: "मदद चाहिए? हमसे संपर्क करने में संकोच न करें। हम आपकी यात्रा या हमारी सेवाओं से संबंधित किसी भी प्रश्न में आपकी सहायता के लिए यहां हैं।"
            },
            contactNumbers: {
                title: "📞 संपर्क नंबर",
                customerSupport: "ग्राहक सहायता",
                bookingAssistance: "बुकिंग सहायता",
                emailSupport: "ईमेल सहायता"
            },
            officeTimings: {
                title: "⏰ कार्यालय समय",
                weekdays: "सोमवार - शुक्रवार",
                saturday: "शनिवार",
                sunday: "रविवार",
                closed: "बंद"
            },
            officeLocations: {
                title: "📍 कार्यालय स्थान",
                chandigarh: "चंडीगढ़ कार्यालय",
                delhi: "दिल्ली कार्यालय",
                gurgaon: "गुरुग्राम कार्यालय"
            }
        }
    };

    const [currentLanguage, setCurrentLanguage] = useState(translations.en);

    useEffect(() => {
        setCurrentLanguage(isHindi ? translations.hi : translations.en);
    }, [isHindi]);

    return (
        <div className="contact-container">
            {/* Header Section */}
            <div className="contact-header">
                <h1>{currentLanguage.header.title}</h1>
                <p>{currentLanguage.header.subtitle}</p>
            </div>

            {/* Contact Info Wrapper */}
            <div className="contact-info-wrapper">
                {/* Contact Numbers Section */}
                <div className="contact-numbers">
                    <h2>{currentLanguage.contactNumbers.title}</h2>
                    <div className="contact-details">
                        <div className="contact-card">
                            <i className="fa fa-phone"></i>
                            <div>
                                <p>{currentLanguage.contactNumbers.customerSupport}</p>
                                <a href="tel:18001802345">1800-180-2345</a>
                            </div>
                        </div>
                        <div className="contact-card">
                            <i className="fa fa-phone"></i>
                            <div>
                                <p>{currentLanguage.contactNumbers.bookingAssistance}</p>
                                <a href="tel:18001802346">1800-180-2346</a>
                            </div>
                        </div>
                        <div className="contact-card">
                            <i className="fa fa-envelope"></i>
                            <div>
                                <p>{currentLanguage.contactNumbers.emailSupport}</p>
                                <a href="mailto:support@hrroadways.com">support@hrroadways.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Office Timings Section */}
                <div className="office-timings">
                    <h2>{currentLanguage.officeTimings.title}</h2>
                    <div className="timings-details">
                        <p>
                            <i className="fa fa-calendar"></i>
                            {currentLanguage.officeTimings.weekdays}: <span>9:00 AM - 6:00 PM</span>
                        </p>
                        <p>
                            <i className="fa fa-calendar-check"></i>
                            {currentLanguage.officeTimings.saturday}: <span>10:00 AM - 4:00 PM</span>
                        </p>
                        <p>
                            <i className="fa fa-ban"></i>
                            {currentLanguage.officeTimings.sunday}: <span>{currentLanguage.officeTimings.closed}</span>
                        </p>
                    </div>
                </div>

                {/* Office Locations Section */}
                <div className="office-locations">
                    <h2>{currentLanguage.officeLocations.title}</h2>
                    <div className="location-details">
                        <div className="location-card">
                            <i className="fa fa-map-marker"></i>
                            <div>
                                <p>{currentLanguage.officeLocations.chandigarh}</p>
                                <span>SCO 50-51, Sector 17, Chandigarh</span>
                            </div>
                        </div>
                        <div className="location-card">
                            <i className="fa fa-map-marker"></i>
                            <div>
                                <p>{currentLanguage.officeLocations.delhi}</p>
                                <span>Rajiv Chowk, New Delhi, 110001</span>
                            </div>
                        </div>
                        <div className="location-card">
                            <i className="fa fa-map-marker"></i>
                            <div>
                                <p>{currentLanguage.officeLocations.gurgaon}</p>
                                <span>Cyber Hub, DLF Phase 3, Gurgaon</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;