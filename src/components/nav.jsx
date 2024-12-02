import React from 'react'
import '../assets/nav.css'
import Logo from '../assets/Logo.png'
function nav() {
  return (
    <>
    <nav>
      <div className="left">
      <img src={Logo} alt='Logo'></img>
      </div>{/* LEft */}

      <div className="right">
        <ul>
          <li><a href='#'>Home</a></li>
          <li><a href='#'>Contact</a></li>
          <li><a href='#'>Donate</a></li>
          <li><a href='#'>Trip</a></li>
          <li>
            <button type='toggle'>Toggle</button>
          </li>
        </ul>
      </div>{/* Right */}
    </nav>
    </>
  )
}

export default nav