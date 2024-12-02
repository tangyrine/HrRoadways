import React from 'react'
import '../assets/BusCard.css'
import busImg from '../assets/hr bus.png'
function BusCard() {
  return (
    <>
    <div className="card">
        <img src={busImg} alt="Travel Image" className="image"/>
        <div className="card-content">
            <h2>Haryana Roadways</h2>
            <p className="description">Need for speed</p>
            <div className="info">
            <div>
                <i className="fas fa-road"></i>
                <span>Distance</span>
                200 km
            </div>
            <div>
                <i className="fas fa-clock"></i>
                <span>Departure Time</span>
                8:30 AM
            </div>
            <div>
                <i className="fas fa-snowflake"></i>
                <span>AC</span>
                Available
            </div>
            <div>
                <i className="fas fa-money-bill-wave"></i>
                <span>Fare</span>
                ₹500
            </div>
            <div className='via'>
                <i className="fas fa-map-marker-alt"></i>
                <b>Via</b> - Route A
                
            </div>
            </div>
            <button className="card-button">Book Now</button>
        </div>
    </div>
    </>
  )
}

export default BusCard