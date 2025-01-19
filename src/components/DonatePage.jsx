import React from 'react';
import '../assets/DonatePage.css';

const DonatePage = () => {
    return (
        <div className="donate-page">
            <header className="navbar">
                <h1>Haryana Roadways</h1>
                <p>Your Journey, Our Pride</p>
            </header>
            <div className="donate-content">
                <h2>Support This Project </h2>
                <p>Your donations help us improve our services and provide safe, reliable transportation for everyone.</p>
                <form className="donate-form">
                    <label htmlFor="donationAmount">Donation Amount (INR):</label>
                    <input type="number" id="donationAmount" name="donationAmount" min="50" required />

                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />

                    <button type="submit">Donate Now</button>
                </form>
            </div>
        </div>
    );
};

export default DonatePage;
