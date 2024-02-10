import Link from 'next/link';
import React from 'react';

import TypedLine from './TypedLine';

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center overflow-hidden px-4 pb-44">
      <div className="text-center">
        <h1 className="font-extrabold tracking-tighter" data-aos="zoom-y-out">
          <span className="custom-fade-out z-50 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-6xl text-transparent">
            AI
          </span>
          <span className="custom-fade-out z-50 text-5xl">-powered</span>
          <br />
          <Link href="/login">
            <TypedLine />
          </Link>
        </h1>
        <p
          className="custom-fade-out mx-auto mt-6 max-w-3xl text-lg text-gray-600"
          data-aos="zoom-y-out"
          data-aos-delay="150"
        >
          Practice Better. Faster. Smarter.
          <span className="bg-black bg-clip-text font-extrabold text-transparent">
            {' '}
            Press the right arrow key to learn more.
          </span>
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
