import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Buscard from './components/BusCard'
import Nav from './components/nav'
import Hero from './components/hero'
import script from './assets/script.js'
function App() {

  return (
    <>
      <Nav/>
      <Hero/>
      {/* <Buscard/> */}
    </>
  )
}

export default App
