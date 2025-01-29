import React from 'react';
import '../styles/modal.css';
import { FaMale, FaFemale, FaChair, FaMapMarkerAlt, FaClock, FaRoute, FaRoad, FaMoneyBillWave } from 'react-icons/fa';

const generateSeats = () => {
  const seats = [];
  for (let i = 1; i <= 60; i++) {
    const status = Math.random();
    if (status < 0.2) {
      seats.push({ id: i, type: 'filled', occupant: 'Male', icon: <FaMale /> });
    } else if (status < 0.4) {
      seats.push({ id: i, type: 'female', occupant: 'Female', icon: <FaFemale /> });
    } else {
      seats.push({ id: i, type: 'open', occupant: 'Unoccupied', icon: <FaChair /> });
    }
  }
  return seats;
};

const BusDetailModal = ({ isOpen, onClose, bus }) => {
  if (!isOpen) return null;

  const seats = generateSeats();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-body">
          <div className="bus-seats-container">
            <h3 className="bus-seats-title">Seat Layout</h3>
            <div className="bus-seats">
              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <div key={rowIndex} className="seat-row">
                  {Array.from({ length: 3 }).map((_, seatIndex) => {
                    const seat = seats[rowIndex * 6 + seatIndex];
                    return (
                      <div
                        key={seat.id}
                        className={`seat ${seat.type}`}
                        title={`Seat ${seat.id}: ${seat.occupant}`}
                      >
                        {seat.icon}
                      </div>
                    );
                  })}
                  <div className="seat aisle"></div>
                  {Array.from({ length: 3 }).map((_, seatIndex) => {
                    const seat = seats[rowIndex * 6 + seatIndex + 3];
                    return (
                      <div
                        key={seat.id}
                        className={`seat ${seat.type}`}
                        title={`Seat ${seat.id}: ${seat.occupant}`}
                      >
                        {seat.icon}
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="seat-key">
              <div className="seat-key-item">
                <div className="seat filled"></div>
                <span>Filled</span>
              </div>
              <div className="seat-key-item">
                <div className="seat female"></div>
                <span>Female</span>
              </div>
              <div className="seat-key-item">
                <div className="seat open"></div>
                <span>Open</span>
              </div>
            </div>
            </div>
          </div>
          <div className="vertical-divider"></div>
          <div className="bus-details">
            <h2 className="modal-title">Bus Details</h2>
            <div className="detail-item">
              <FaMapMarkerAlt className="detail-icon" />
              <div className="detail-text"><strong>Departure:</strong> {bus.from}</div>
            </div>
            <div className="detail-item">
              <FaMapMarkerAlt className="detail-icon" />
              <div className="detail-text"><strong>Destination:</strong> {bus.to}</div>
            </div>
            <div className="detail-item">
              <FaClock className="detail-icon" />
              <div className="detail-text"><strong>Timing:</strong> {bus.Departure_Time}</div>
            </div>
            <div className="detail-item">
              <FaRoute className="detail-icon" />
              <div className="detail-text"><strong>Via:</strong> {bus.Via}</div>
            </div>
            <div className="detail-item">
              <FaClock className="detail-icon" />
              <div className="detail-text"><strong>Estimated Time:</strong> {bus.Estimated_Time}</div>
            </div>
            <div className="detail-item">
              <FaRoad className="detail-icon" />
              <div className="detail-text"><strong>Distance:</strong> {bus.Total_Distance}</div>
            </div>
            <div className="detail-item">
              <FaMoneyBillWave className="detail-icon" />
              <div className="detail-text"><strong>Cost:</strong> {bus.Price}</div>
            </div>
            <div className="detail-item">
              <FaChair className="detail-icon" />
              <div className="detail-text"><strong>Seats Booked:</strong> {seats.filter(seat => seat.type === 'filled').length}</div>
            </div>            
          </div>
        </div>
        <button className="book-button" onClick={"/under-construction"}>Book</button>
      </div>
    </div>
  );
};

export default BusDetailModal;