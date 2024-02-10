import Image from 'next/image';
import React from 'react';

function Demo() {
  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-hidden pb-44">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:mt-5 sm:text-5xl">
            <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-6xl text-transparent">
              How we offer it
            </span>
          </p>
          <p className="mx-auto max-w-3xl pt-3 text-xl text-gray-500">
            Still not convinced? Here&apos;s a quick demo that highlights the
            main features.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <Image
            src="/assets/demo.gif"
            alt="Animated GIF showing how the app works"
            width={500}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}

export default Demo;
