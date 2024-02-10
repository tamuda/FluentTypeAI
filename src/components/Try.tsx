import Link from 'next/link';
import React from 'react';

import TypedLine from './TypedLineTry';

function Try() {
  return (
    <div className="flex min-h-screen flex-col justify-center overflow-hidden px-4 pb-44">
      <div className="text-center">
        <h1 className="font-extrabold tracking-tighter" data-aos="zoom-y-out">
          <Link href="/login">
            <TypedLine />
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default Try;
