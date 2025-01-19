import React from 'react';
import '../assets/TravelLocations.css';
import Surajkund from '../assets/Surajkund.jpg';
import Sultanpur_National_Park from '../assets/Sultanpur_National_Park.webp';
import Kurukshetra from '../assets/Kurukshetra.jpg';
import Pinjore_Gardens from '../assets/Pinjore_Gardens.avif';
import Morni_Hills from '../assets/Morni_Hills.webp';
import Gurgaon from '../assets/GURGAON.jpg';
import Panchkula from '../assets/Panchkula.jpg';

const TravelLocations = () => {
    const locations = [
        { name: "Sultanpur National Park", description: "A paradise for bird watchers.", image:Sultanpur_National_Park },
        { name: "Kurukshetra", description: "A historical city from Mahabharata.", image:Kurukshetra },
        { name: "Pinjore Gardens", description: "Beautiful Mughal gardens.", image: Pinjore_Gardens },
        { name: "Morni Hills", description: "Ideal for nature lovers.", image: Morni_Hills },
        { name: "Surajkund", description: "Famous for its annual crafts fair.", image: Surajkund },
        { name: "Gurgaon", description: "Gurgaon is not only one of the most urbanised cities of India, but it also boasts of a skyline that can easily rival those of Hong Kong and Singapore.", image: Gurgaon },
        { name: "Panchkula", description: "Present on the way to hills of Shimla, Panchkula is famous for the ruins of the Chandels and trekking on Morni Hills teemed with peacocks.", image: Panchkula }
    ];

    return (
        <div className="travel-locations">
            <h2>Popular Travel Locations in Haryana</h2>
            <div className="locations-list">
                {locations.map((location, index) => (
                    <div key={index} className="location-card">
                        <img src={location.image} alt={location.name} />
                        <h3>{location.name}</h3>
                        <p>{location.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TravelLocations;
