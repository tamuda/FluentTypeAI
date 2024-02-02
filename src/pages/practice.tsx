import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

import Footer from '../components/FooterDashboard';
import Header from '../components/HeaderDashboard';
import Interface from '../components/Interface';
import Leaderboard from '../components/Leaderboard';
import StatsHistory from '../components/StatsHistory';

const Practice = () => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const [currentSlide, setCurrentSlide] = useState(1);
  const [statsHistoryKey, setStatsHistoryKey] = useState(0);
  const [leaderboardKey, setLeaderboardKey] = useState(0);

  const reloadData = () => {
    setStatsHistoryKey((prevKey) => prevKey + 1);
    setLeaderboardKey((prevKey) => prevKey + 1);
  };

  const handleRightArrowAction = () => {
    setCurrentSlide((prev) => (prev < 2 ? prev + 1 : prev));
  };

  useEffect(() => {
    if (currentSlide === 0 || currentSlide === 2) {
      console.log(`Reloading data on slide ${currentSlide}`);
      reloadData();
    }
  }, [currentSlide]);

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'ArrowRight') {
      handleRightArrowAction();
    } else if (e.key === 'ArrowLeft') {
      setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide]);

  if (isLoading) {
    return <div role="status"></div>;
  }

  const LeftArrow = (
    clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined,
    hasPrev: boolean
  ) =>
    hasPrev && (
      <div className="absolute left-0 top-1/2 z-10 flex -translate-y-1/2 flex-row pb-36">
        <button onClick={clickHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </button>
        {currentSlide === 1 && (
          <button onClick={clickHandler} className="text-sm">
            Leaderboard
          </button>
        )}
      </div>
    );

  const RightArrow = (
    clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined,
    hasNext: boolean
  ) =>
    hasNext && (
      <div className="absolute right-0 top-1/2 z-10 flex -translate-y-1/2 flex-row pb-36">
        {currentSlide === 1 && (
          <button onClick={clickHandler} className="text-sm">
            Dashboard
          </button>
        )}
        <button onClick={clickHandler} aria-label="Next Slide">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
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
          <Leaderboard key={leaderboardKey} />
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
