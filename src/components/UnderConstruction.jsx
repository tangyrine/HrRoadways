// src/components/UnderConstruction.jsx
import React from 'react';
import '../styles/underConstruction.css';
import constructionImage from '../assets/under-construction.webp'; // Ensure the image is in this path

const UnderConstruction = () => {
    return (
        <div className="under-construction">
            <h1>Under Construction</h1>
            <div className="animation-container">
                <img 
                    src={constructionImage} 
                    alt="Under Construction" 
                    height="400" 
                    width="400" 
                />
            </div>
        </div>
    );
};

export default UnderConstruction;
