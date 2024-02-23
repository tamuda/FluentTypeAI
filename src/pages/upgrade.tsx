import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React from 'react';

function Try() {
  const { data: session } = useSession();

  const updateInterest = async () => {
    const timestamp = new Date().getTime();

    try {
      await fetch('/api/update_interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Timestamp': timestamp.toString(),
        },
      });
    } catch (error) {
      console.error('Error updating typing history', error);
    }
  };

  if (session && session.user) {
    updateInterest();

    return (
      <div className=" flex min-h-screen flex-col justify-center overflow-hidden px-4 pb-28">
        <div className="text-center">
          <p className="text-5xl font-extrabold text-gray-900">
            <span className="inline-block bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
              Thank you for showing interest in FluentTypeAI
            </span>
          </p>
          <p className="mx-auto mt-10 pb-20 text-sm text-gray-500 sm:text-base md:text-lg lg:max-w-4xl xl:max-w-5xl">
            We are currently still developing features. We have noted down your
            email & will notify you first. We are excited to have you on board!
            🚀
          </p>
          <Link href="/practice" className="text-xl">
            Go back to the practice grounds
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <p className="mb-4 text-2xl font-bold">You are not logged in.</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Click here to go back to the homepage.
        </Link>
      </div>
    );
  }
}

export default Try;
