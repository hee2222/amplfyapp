import React from 'react';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Projects from './pages/Projects';

const App = () => {
  return (
    <div>
      <header>
        <Link to="/">HOME</Link>
      </header>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Projects" element={<Projects />} />
      </Routes>
    </div>
  );
};

export default App;
