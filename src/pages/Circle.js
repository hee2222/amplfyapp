import { gsap } from 'gsap';
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

const Circle = forwardRef(({ size, delay }, ref) => {
  const el = useRef();

  useImperativeHandle(
    ref,
    () => {
      // return our API
      return {
        moveTo(x, y) {
          gsap.to(el.current, { x, y, delay });
        },
      };
    },
    [delay, el]
  );

  return <div className={`circle ${size}`} ref={el}></div>;
});

export default Circle;
