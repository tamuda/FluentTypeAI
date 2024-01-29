import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import Footer from '../components/FooterDashboard';
import Header from '../components/HeaderDashboard';
import Interface from '../components/Interface';
import StatsHistory from '../components/StatsHistory';

const Practice = () => {
  const { data: session } = useSession();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [statsHistoryKey, setStatsHistoryKey] = useState(0); // Key for StatsHistory component

  const reloadStatsHistory = () => {
    setStatsHistoryKey((prevKey) => prevKey + 1); // Update key to remount StatsHistory
  };

  const handleRightArrowAction = () => {
    setCurrentSlide((prev) => prev + 1);
    reloadStatsHistory();
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'ArrowRight') {
      setCurrentSlide((prev) => prev + 1);
      handleRightArrowAction();
    } else if (e.key === 'ArrowLeft') {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const LeftArrow = (
    clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined,
    hasPrev: boolean
  ) =>
    hasPrev && (
      <button
        onClick={clickHandler}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 pb-36"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
          />
        </svg>
      </button>
    );

  const RightArrow = (
    clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined,
    hasNext: boolean
  ) =>
    hasNext && (
      <button
        onClick={clickHandler}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 pb-36"
        aria-label="Next Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    );
  if (session && session.user) {
    return (
      <div className="flex h-screen flex-col overflow-hidden">
        <Header user={session} />

        <Carousel
          selectedItem={currentSlide}
          onChange={(index) => setCurrentSlide(index)}
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
          dynamicHeight={false}
          renderArrowNext={(clickHandler, hasNext) =>
            RightArrow(clickHandler, hasNext)
          }
          renderArrowPrev={(clickHandler, hasPrev) =>
            LeftArrow(clickHandler, hasPrev)
          }
        >
          <Interface user={session} />
          <StatsHistory key={statsHistoryKey} user={session} />
        </Carousel>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p className="mb-4 text-2xl font-bold">You are not logged in.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Click here to go back to the homepage.
      </Link>
    </div>
  );
};

export default Practice;
