import Image from 'next/image';
import React from 'react';

function Demo() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pb-40">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-2xl font-extrabold text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            <span className="inline-block bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
              Quick demo
            </span>
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500 sm:text-lg md:max-w-2xl md:text-xl">
            Here&apos;s a quick demo that highlights the main features.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div
            className="relative"
            style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
          >
            <Image
              src="/assets/demo.gif"
              alt="Animated GIF showing how the app works"
              width={500}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demo;
