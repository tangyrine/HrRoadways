import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/nav';
import Hero from './components/hero';
import Available from './components/Available';
import AboutUs from './components/Aboutus'; // Import AboutUs component

function Home() {
    return <p>Hero</p>;
}

function Contact() {
    return <h1>Contact Page</h1>;
}

function Donate() {
    return <h1>Donate Page</h1>;
}

function Trip() {
    return <h1>Trip Page</h1>;
}

function App() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path='/' element={<Hero />} />
                <Route path='/Available' element={<Available />} />
                <Route path='/about' element={<AboutUs />} /> 
            </Routes>
        </Router>
    );
}

export default App;
