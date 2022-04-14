import React, { useRef, useEffect } from 'react';
import './App.scss';
import { useLocation, Route, Routes, Link } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Circle from './pages/Circle';
import Projects from './pages/Projects';

const App = () => {
  const location = useLocation();
  const circleRefs = useRef([]);

  // reset on re-renders
  circleRefs.current = [];

  useEffect(() => {
    circleRefs.current.forEach((ref) =>
      ref.moveTo(location.innerWidth / 2, location.innerHeight / 2)
    );

    const onMove = ({ clientX, clientY }) => {
      circleRefs.current.forEach((ref) => ref.moveTo(clientX, clientY));
    };

    window.addEventListener('pointermove', onMove);

    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const addCircleRef = (ref) => {
    if (ref) {
      circleRefs.current.push(ref);
    }
  };
  return (
    <>
      <header>
        <Link to="/">HOME</Link>
      </header>
      <div>
        <Circle size="sm" ref={addCircleRef} delay={0} />
        <Circle size="md" ref={addCircleRef} delay={0.1} />
        <Circle size="lg" ref={addCircleRef} delay={0.2} />
      </div>
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Projects" element={<Projects />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
