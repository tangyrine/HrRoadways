import React from "react";
import "../assets/ContactUs.css";

const ContactUs = () => {
    return (
        <div className="contact-container">
            {/* Header Section */}
            <div className="contact-header">
                <h1>Contact Us</h1>
                <p>
                    Need help? Feel free to reach out to us. We’re here to assist you with any
                    queries related to your journey or our services.
                </p>
            </div>

            {/* Contact Info Wrapper */}
            <div className="contact-info-wrapper">
                {/* Contact Numbers Section */}
                <div className="contact-numbers">
                    <h2>📞 Contact Numbers</h2>
                    <div className="contact-details">
                        <div className="contact-card">
                            <i className="fa fa-phone"></i>
                            <div>
                                <p>Customer Support</p>
                                <a href="tel:18001802345">1800-180-2345</a>
                            </div>
                        </div>
                        <div className="contact-card">
                            <i className="fa fa-phone"></i>
                            <div>
                                <p>Booking Assistance</p>
                                <a href="tel:18001802346">1800-180-2346</a>
                            </div>
                        </div>
                        <div className="contact-card">
                            <i className="fa fa-envelope"></i>
                            <div>
                                <p>Email Support</p>
                                <a href="mailto:support@hrroadways.com">support@hrroadways.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Office Timings Section */}
                <div className="office-timings">
                    <h2>⏰ Office Timings</h2>
                    <div className="timings-details">
                        <p>
                            <i className="fa fa-calendar"></i>
                            Monday - Friday: <span>9:00 AM - 6:00 PM</span>
                        </p>
                        <p>
                            <i className="fa fa-calendar-check"></i>
                            Saturday: <span>10:00 AM - 4:00 PM</span>
                        </p>
                        <p>
                            <i className="fa fa-ban"></i>
                            Sunday: <span>Closed</span>
                        </p>
                    </div>
                </div>

                {/* Office Locations Section */}
                <div className="office-locations">
                    <h2>📍 Office Locations</h2>
                    <div className="location-details">
                        <div className="location-card">
                            <i className="fa fa-map-marker"></i>
                            <div>
                                <p>Chandigarh Office</p>
                                <span>SCO 50-51, Sector 17, Chandigarh</span>
                            </div>
                        </div>
                        <div className="location-card">
                            <i className="fa fa-map-marker"></i>
                            <div>
                                <p>Delhi Office</p>
                                <span>Rajiv Chowk, New Delhi, 110001</span>
                            </div>
                        </div>
                        <div className="location-card">
                            <i className="fa fa-map-marker"></i>
                            <div>
                                <p>Gurgaon Office</p>
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
