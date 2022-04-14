import { gsap } from 'gsap';
import React, { useRef, useEffect } from 'react';

const About = () => {
  const boxRef = useRef();

  useEffect(() => {
    gsap.to(boxRef.current, { rotation: '+=360' });
  });

  const onEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, { backgroundColor: 'greenyellow' });
  };
  const onLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, { backgroundColor: 'lemonchiffon' });
  };

  return (
    <div
      className="box"
      ref={boxRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <h1>HELLO</h1>
    </div>
  );
};

export default About;

// gsap.defaults({
//   overwrite: true,
// });
