import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import '../assets/nav.css';
import Logo from '../assets/Logo.png';

function Navigation() {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => setIsToggled(!isToggled);

    return (
        <>
            <nav>
                <div className="left">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="right">
                    <ul>
                        {/* Replace href with Link and to="/" */}
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/donate">Donate</Link></li>
                        <li><Link to="/about" style={{ textDecoration: 'none', color: 'white', fontSize: '15px' }}>About us</Link></li>
                        <li><Link to="/trip">Trip</Link></li>
                        <li className='lang'>
                            EN
                            <div className="checkbox-wrapper-5">
                                <div className="check">
                                    <input defaultChecked id="check-5" type="checkbox" />
                                    <label htmlFor="check-5" />
                                </div>
                            </div>
                            HI
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navigation;
