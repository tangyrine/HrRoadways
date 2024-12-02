import React from 'react'
import '../assets/hero.css'
import Bus from '../assets/Bus.png'
function hero() {
  return (
    <div className='hero'>
    <div className="body">
        <div className="left">
          <center><p class='hea'>Haryana Roadways always Best</p></center>
          <div className="form">
            <form>
            <center><p>Search all Haryana Buses</p></center>
            <div className="input-group">
              <input required type="text" name="text" autoComplete="off" className="input" />
              <label className="user-label">Departure Bus Stand</label>
            </div>

            <br/>
    
            <div className="input-group">
              <input required type="text" name="text" autoComplete="off" className="input" />
              <label className="user-label">Arrival Bus Stand</label>
            </div>

            <br/>
            <button className="CartBtn">
  <span className="IconContainer">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="18px" fill="white">
      <path d="M6,28 C4.9,28 4,28.9 4,30 L4,50 C4,51.1 4.9,52 6,52 L58,52 C59.1,52 60,51.1 60,50 L60,30 C60,28.9 59.1,28 58,28 L6,28 Z M6,30 L58,30 L58,48 L6,48 L6,30 Z M9,46 L9,34 L55,34 L55,46 L9,46 Z M10,42 C10.55,42 11,42.45 11,43 C11,43.55 10.55,44 10,44 C9.45,44 9,43.55 9,43 C9,42.45 9.45,42 10,42 Z M54,42 C54.55,42 55,42.45 55,43 C55,43.55 54.55,44 54,44 C53.45,44 53,43.55 53,43 C53,42.45 53.45,42 54,42 Z M19,24 C19,22.9 19.9,22 21,22 L43,22 C44.1,22 45,22.9 45,24 C45,25.1 44.1,26 43,26 L21,26 C19.9,26 19,25.1 19,24 Z M11,26 L53,26 C53.55,26 54,26.45 54,27 C54,27.55 53.55,28 53,28 L11,28 C10.45,28 10,27.55 10,27 C10,26.45 10.45,26 11,26 Z M28,12 C28,11.45 28.45,11 29,11 C29.55,11 30,11.45 30,12 C30,12.55 29.55,13 29,13 C28.45,13 28,12.55 28,12 Z M36,12 C36,11.45 36.45,11 37,11 C37.55,11 38,11.45 38,12 C38,12.55 37.55,13 37,13 C36.45,13 36,12.55 36,12 Z M50,30 C49.45,30 49,30.45 49,31 C49,31.55 49.45,32 50,32 C50.55,32 51,31.55 51,31 C51,30.45 50.55,30 50,30 Z M14,30 C13.45,30 13,30.45 13,31 C13,31.55 13.45,32 14,32 C14.55,32 15,31.55 15,31 C15,30.45 14.55,30 14,30 Z M50,18 C49.45,18 49,18.45 49,19 C49,19.55 49.45,20 50,20 C50.55,20 51,19.55 51,19 C51,18.45 50.55,18 50,18 Z M14,18 C13.45,18 13,18.45 13,19 C13,19.55 13.45,20 14,20 C14.55,20 15,19.55 15,19 C15,18.45 14.55,18 14,18 Z" />
    </svg>
  </span>
  <p className="text" >Search Now</p>
</button>


          
            </form>
          </div>
        </div>{/* Left */}
        <div className="right">
          <p>"Plan Your Journey with Haryana Roadways"</p>
          <div className="image">
            <img src={Bus}/>
          </div>
        </div>{/* Right */}
    </div>
    </div>
  )
}

export default hero