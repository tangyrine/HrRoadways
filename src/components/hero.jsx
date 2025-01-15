import React, { useState } from 'react'; // Import useState hook
import '../assets/hero.css';
import {Link} from 'react-router-dom';
import Bus from '../assets/Bus.png';
function Hero() {
    // Step 1: Define a state to store form data
    const [formData, setFormData] = useState({
        src: '',
        dest: '',
    });
    console.log(Bus);
    // Step 2: Handle input changes and update the state
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData, // Keep existing data
            [name]: value // Update the specific field
        });
    };

    // Step 3: Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent page reload
        console.log('Form Data:', formData); // Log data to console
        alert('Search initiated! Check the console for details.');
    };
    
    return (
        <div className="hero">
            <div className="body">
                {/* Left Section */}
                <div className="left">
                    <center>
                        <p className="hea">Haryana Roadways Always Best</p>
                    </center>
                    <div className="form">
                        <form onSubmit={handleSubmit} action='./Available.jsx'>
                            <center>
                                <p>Search All Haryana Buses</p>
                            </center>
                            <div className="input-group">
                              <input
                                  required
                                  type="text"
                                  name="src" // Matches the key in state
                                  autoComplete="off"
                                  className="input"
                                  value={formData.src}
                                  onChange={handleChange}
                              />
                              <label className="user-label">Departure Bus Stand</label>
                          </div>
                          <br></br>
                          <div className="input-group">
                              <input
                                  required
                                  type="text"
                                  name="dest" // Matches the key in state
                                  autoComplete="off"
                                  className="input"
                                  value={formData.dest}
                                  onChange={handleChange}
                              />
                              <label className="user-label">Arrival Bus Stand</label>
                          </div>

                            <br />

                            <br />
                            <Link to='/Available'>
                            <button type="submit" className="CartBtn">
                                <span className="IconContainer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="18px" fill="white">
                                        <path d="M6,28 C4.9,28 4,28.9 4,30 L4,50 C4,51.1 4.9,52 6,52 L58,52 C59.1,52 60,51.1 60,50 L60,30 C60,28.9 59.1,28 58,28 L6,28 Z M6,30 L58,30 L58,48 L6,48 L6,30 Z M9,46 L9,34 L55,34 L55,46 L9,46 Z M10,42 C10.55,42 11,42.45 11,43 C11,43.55 10.55,44 10,44 C9.45,44 9,43.55 9,43 C9,42.45 9.45,42 10,42 Z M54,42 C54.55,42 55,42.45 55,43 C55,43.55 54.55,44 54,44 C53.45,44 53,43.55 53,43 C53,42.45 53.45,42 54,42 Z" />
                                    </svg>
                                </span>
                                <p className="text">Search Now</p>
                            </button>
                            </Link>

                        </form>
                    </div>
                </div>

                {/* Right Section */}
                <div className="right">
                    <p>"Plan Your Journey with Haryana Roadways"</p>
                    <div className="image">
                    <img src={Bus} alt="Bus" loading="lazy" />
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default Hero;
