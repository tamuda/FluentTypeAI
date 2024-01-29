import Link from 'next/link';
import React from 'react';

import TypedLine from './TypedLine';

function LandingPage() {
  return (
    <div className="flex-grow flex items-center justify-center overflow-y-auto px-4">
      <section className="flex flex-col items-center justify-center overflow-y-auto">
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
              With AI Error Auto-Prediction - <b>Not Correction</b>.
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
