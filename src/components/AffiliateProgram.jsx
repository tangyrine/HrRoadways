import React from "react";
import "../assets/AffiliateProgram.css";

const AffiliateProgram = ({ isHindi }) => {
    const content = {
        headerTitle: isHindi ? 'हमारे सहायक कार्यक्रम में शामिल हों' : 'Join Our Affiliate Program',
        headerDescription: isHindi
            ? 'हमारे साथ साझेदारी करें और दूसरों को हमारी अद्भुत सेवाओं की खोज में मदद करते हुए कमाएं। यह सरल, लाभदायक और एक शानदार अवसर है!'
            : 'Partner with us and earn while you help others discover our amazing services. It’s simple, rewarding, and a great opportunity!',
        joinNow: isHindi ? 'अभी शामिल हों' : 'Join Now',
        whyJoin: isHindi ? 'क्यों शामिल हों?' : 'Why Join?',
        benefits: [
            {
                title: isHindi ? 'कमीशन कमाएं' : 'Earn Commission',
                description: isHindi
                    ? 'हर रेफ़रल के लिए एक अच्छा कमीशन अर्जित करें।'
                    : 'Earn a generous commission for every referral.',
                icon: '💰',
            },
            {
                title: isHindi ? 'विशेष पुरस्कार' : 'Exclusive Rewards',
                description: isHindi
                    ? 'जैसे-जैसे आप बढ़ते हैं, विशेष पुरस्कार और लाभ प्राप्त करें।'
                    : 'Unlock exclusive rewards and perks as you grow.',
                icon: '🎁',
            },
            {
                title: isHindi ? 'मार्केटिंग सामग्री' : 'Marketing Materials',
                description: isHindi
                    ? 'बैनर, टेम्पलेट और संसाधनों तक पहुंच प्राप्त करें।'
                    : 'Get access to banners, templates, and resources.',
                icon: '📈',
            },
        ],
        footerTitle: isHindi ? 'शुरू करने के लिए तैयार हैं?' : 'Ready to get started?',
        signUp: isHindi ? 'सहायक के रूप में साइन अप करें' : 'Sign Up as an Affiliate',
    };

    return (
        <div className="affiliate-program">
            <header className="affiliate-header">
                <h1>{content.headerTitle}</h1>
                <p>{content.headerDescription}</p>
                <button className="join-button">{content.joinNow}</button>
            </header>

            <section className="benefits-section">
                <h2>{content.whyJoin}</h2>
                <div className="benefits-container">
                    {content.benefits.map((benefit, index) => (
                        <div key={index} className="benefit-card">
                            <span className="benefit-icon">{benefit.icon}</span>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="affiliate-footer">
                <h2>{content.footerTitle}</h2>
                <button className="join-button">{content.signUp}</button>
            </footer>
        </div>
    );
};

export default AffiliateProgram;