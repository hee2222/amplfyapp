import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import React, { useRef, useEffect } from 'react';

const Home = () => {
  const sloganRef = useRef();

  //slogan tape style
  // const clone = target.cloneNode(true);
  // target.after(clone);
  useEffect(() => {
    gsap
      .to(sloganRef.current, {
        duration: 2,
        xPercent: -10,
        ease: 'none',
        repeat: -1,
      })
      .timeScale(1);
  });

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/About">ABOUT</Link>
          </li>
          <li>
            <Link to="/Projects">PROJECT</Link>
          </li>
        </ul>
      </nav>
      <div className="slogan" ref={sloganRef}>
        <span>H</span>EEEE<span>H</span>EEEE<span>H</span>EEEE<span>H</span>EEEE
        <span>H</span>EEEE<span>H</span>EEEE<span>H</span>EEEE<span>H</span>EEEE
      </div>
    </>
  );
};

export default Home;
