// src/components/UnderConstruction.jsx
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/under-construction.json'; // Ensure you have the Lottie file in this path
import '../assets/underConstruction.css';

const UnderConstruction = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="under-construction">
            <h1>Under Construction</h1>
            <div className="animation-container">
                <Lottie options={defaultOptions} height={400} width={400} />
            </div>
        </div>
    );
};

export default UnderConstruction;