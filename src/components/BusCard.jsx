import React from 'react'
import '../assets/BusCard.css'
import { MdPinDrop } from "react-icons/md";
import { TiFlag } from "react-icons/ti";
import { FaLongArrowAltRight } from "react-icons/fa";

import busImg from '../assets/hr_bus.png'
function BusCard() {
  return (
    <>
     <div className="card">

        <div className="image">
        <img src={busImg} alt="Travel Image" className="image_tag"/>
        </div>{/* Image */}

        <div className="card-content">
            <h2>Haryana Roadways</h2>
            <p className="description">Have a safe journey with Haryana Roadways</p>
            <div className="info">
            <div>
                <i className="fa-solid fa-map-pin"></i>
                <span>Dehadun</span>

                <i className="fa-solid fa-arrow-right"></i>

                <i className="fa-solid fa-location-dot"></i>
                <span>Yamunanagar</span>

                <i className="fa-solid fa-bolt"></i>

                <span>Distance : </span>
                200 km
            </div>
            <div>
                <i className="fas fa-clock"></i>
                <span>Departure Time : </span>
                8:30 AM
            </div>
            <div>
                <i className="fas fa-snowflake"></i>
                <span>AC : </span>
                Available
            </div>
            <div>
                <i className="fas fa-money-bill-wave"></i>
                <span>Fare : </span>
                ₹500
            </div>
            <div className='via'>
                <i className="fas fa-map-marker-alt"></i>
                <b>Via</b> - Route A

            </div>
            </div>
        </div>{/* Content */}

        <div className="buttons">
            <button>Checkout</button>
            <button>Compare</button>
            <button>Map</button>
        </div>{/* Buttons */}
    </div>

    </>
  )
}

export default BusCard
