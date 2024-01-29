import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedLine = () => {
  const el = useRef<HTMLElement | null>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    const options = {
      stringsElement: '#bios',
      typeSpeed: 26,
      backSpeed: 20,
      loop: false,
      backDelay: 1000,
    };
    typed.current = new Typed(el.current!, options);
    return () => {
      if (typed.current) typed.current.destroy();
    };
  });

  return (
    <div className="text-7xl">
      <ul id="bios" className="">
        <li className="text-7xl">
          Touch Typ
          <span className="text-7xl bg-gradient-to-r from-red-600 to-teal-400 bg-clip-text text-transparent">
            ieng
          </span>
        </li>
        <li className="text-7xl">
          <span className="text-7xl bg-gradient-to-r from-red-600 to-teal-400 bg-clip-text text-transparent">
            Toch
          </span>{' '}
          Typing{' '}
          <span className="text-7xl bg-gradient-to-r from-red-600 to-teal-400 bg-clip-text text-transparent">
            Pred
          </span>
        </li>

        <li className="text-7xl">Touch Typing Practice</li>
        <li className="text-7xl">Click here to get started.</li>
      </ul>
      <span
        ref={el}
        className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent "
      />
    </div>
  );
};

export default TypedLine;
