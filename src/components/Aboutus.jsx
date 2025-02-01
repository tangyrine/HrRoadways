import React, { useEffect, useState } from 'react';
import { MapPin, Award } from 'lucide-react';
import '../styles/Aboutus.css'; // Import the CSS file

// Import team member images
const teamMember1 = 'https://i.ibb.co/YTWD3c0Z/team-member1.png';
const teamMember2 = 'https://i.ibb.co/1WrGL1w/team-member2.png';
const teamMember3 = 'https://i.ibb.co/BHsj3qCM/team-member3.png';

function AboutUs({ isHindi }) {
    const translations = {
        en: {
            title: "About Us",
            description: "Welcome to Haryana Tourism! We are passionate about showcasing the rich cultural heritage and natural beauty of Haryana. Our team is dedicated to promoting authentic Haryanvi experiences, preserving traditions, and offering unique travel opportunities.",
            missionTitle: "Our Mission",
            missionDescription: "Our mission is to preserve and promote the vibrant culture of Haryana while providing exceptional tourism experiences. We strive to showcase our state's rich heritage, foster community support, and deliver authentic experiences to all visitors.",
            valuesTitle: "Our Cultural Values",
            values: [
                { title: "Hospitality", description: "Embodying the spirit of 'Atithi Devo Bhava'" },
                { title: "Heritage", description: "Preserving our rich Haryanvi traditions" },
                { title: "Community", description: "Supporting local artisans and culture" },
                { title: "Excellence", description: "Delivering authentic experiences" }
            ],
            culturalHighlights: "Cultural Highlights",
            culturalEvents: [
                { name: "Geeta Jayanti", date: "December", location: "Kurukshetra" },
                { name: "Surajkund Mela", date: "February", location: "Faridabad" },
                { name: "Haryana Day", date: "November 1st", location: "Statewide" }
            ],
            teamTitle: "Meet Our Team",
            team: [
                { name: "Nishant Rana", role: "CEO & Founder", expertise: "Cultural Heritage Expert", image: teamMember1 },
                { name: "Amaan Syed", role: "Lead Developer", expertise: "Digital Innovation", image: teamMember2 },
                { name: "Sanjeevani", role: "Chief Marketing Officer", expertise: "Tourism Development", image: teamMember3 }
            ],
            achievements: "Our Achievements",
            achievementsList: [
                "Best Tourism Initiative Award 2024",
                "Cultural Preservation Excellence",
                "Digital Innovation in Tourism"
            ]
        },
        hi: {
            title: "हमारे बारे में",
            description: "हरियाणा पर्यटन में आपका स्वागत है! हम हरियाणा की समृद्ध सांस्कृतिक विरासत और प्राकृतिक सुंदरता को प्रदर्शित करने के बारे में उत्साही हैं। हमारी टीम प्रामाणिक हरियाणवी अनुभवों को बढ़ावा देने, परंपराओं को संरक्षित करने और अद्वितीय यात्रा अवसर प्रदान करने के लिए समर्पित है।",
            missionTitle: "हमारा मिशन",
            missionDescription: "हमारा मिशन हरियाणा की जीवंत संस्कृति को संरक्षित और बढ़ावा देना है जबकि उत्कृष्ट पर्यटन अनुभव प्रदान करना है। हम अपने राज्य की समृद्ध विरासत को प्रदर्शित करने, समुदाय समर्थन को बढ़ावा देने और सभी आगंतुकों को प्रामाणिक अनुभव प्रदान करने का प्रयास करते हैं।",
            valuesTitle: "हमारे सांस्कृतिक मूल्य",
            values: [
                { title: "आतिथ्य", description: "'अतिथि देवो भव' की भावना को साकार करना" },
                { title: "विरासत", description: "हमारी समृद्ध हरियाणवी परंपराओं का संरक्षण" },
                { title: "समुदाय", description: "स्थानीय कलाकारों और संस्कृति का समर्थन" },
                { title: "उत्कृष्टता", description: "प्रामाणिक अनुभव प्रदान करना" }
            ],
            culturalHighlights: "सांस्कृतिक विशेषताएं",
            culturalEvents: [
                { name: "गीता जयंती", date: "दिसंबर", location: "कुरुक्षेत्र" },
                { name: "सूरजकुंड मेला", date: "फरवरी", location: "फरीदाबाद" },
                { name: "हरियाणा दिवस", date: "1 नवंबर", location: "पूरे राज्य में" }
            ],
            teamTitle: "हमारी टीम से मिलें",
            team: [
                { name: "निशांत राणा", role: "CEO और संस्थापक", expertise: "सांस्कृतिक विरासत विशेषज्ञ", image: teamMember1 },
                { name: "अमान सैयद", role: "लीड डेवलपर", expertise: "डिजिटल नवाचार", image: teamMember2 },
                { name: "संजीवनी", role: "मुख्य विपणन अधिकारी", expertise: "पर्यटन विकास", image: teamMember3 }
            ],
            achievements: "हमारी उपलब्धियां",
            achievementsList: [
                "सर्वश्रेष्ठ पर्यटन पहल पुरस्कार 2024",
                "सांस्कृतिक संरक्षण उत्कृष्टता",
                "पर्यटन में डिजिटल नवाचार"
            ]
        }
    };

    const [currentLanguage, setCurrentLanguage] = useState(translations.en);
    const [activeEvent, setActiveEvent] = useState(null);

    useEffect(() => {
        setCurrentLanguage(isHindi ? translations.hi : translations.en);
    }, [isHindi]);

    return (
        <div className="aboutus-container">
            <div className="content-wrapper">
                {/* Hero Section */}
                <div className="hero-section">
                    <h1 className="hero-title">{currentLanguage.title}</h1>
                    <p className="hero-description">{currentLanguage.description}</p>
                </div>

                {/* Values Section */}
                <div className="values-section">
                    {currentLanguage.values.map((value, index) => (
                        <div key={index} className="value-card">
                            <h3 className="value-title">{value.title}</h3>
                            <p className="value-description">{value.description}</p>
                        </div>
                    ))}
                </div>

                {/* Cultural Events Section */}
                <div className="cultural-events-section">
                    <h2 className="section-title">{currentLanguage.culturalHighlights}</h2>
                    <div className="events-grid">
                        {currentLanguage.culturalEvents.map((event, index) => (
                            <div
                                key={index}
                                className="event-card"
                                onMouseEnter={() => setActiveEvent(index)}
                                onMouseLeave={() => setActiveEvent(null)}
                            >
                                <div className="event-header">
                                    <MapPin className="icon" />
                                    <h3 className="event-name">{event.name}</h3>
                                </div>
                                <p className="event-date">{event.date}</p>
                                <p className="event-location">{event.location}</p>
                                {activeEvent === index && (
                                    <div className="event-extra-info">
                                        Click to learn more about this event
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="team-section">
                    <h2 className="section-title">{currentLanguage.teamTitle}</h2>
                    <div className="team-grid">
                        {currentLanguage.team.map((member, index) => (
                            <div key={index} className="team-member-card">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="team-member-image"
                                />
                                <h3 className="team-member-name">{member.name}</h3>
                                <p className="team-member-role">{member.role}</p>
                                <p className="team-member-expertise">{member.expertise}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievements Section */}
                <div className="achievements-section">
                    <h2 className="section-title">{currentLanguage.achievements}</h2>
                    <div className="achievements-grid">
                        {currentLanguage.achievementsList.map((achievement, index) => (
                            <div key={index} className="achievement-item">
                                <Award className="icon" />
                                <p className="achievement-description">{achievement}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;