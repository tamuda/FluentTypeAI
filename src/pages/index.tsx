import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

import Demo from '@/components/Demo';
import Features from '@/components/Features';
import FlyingText from '@/components/FlyingText';
import LandingPage from '@/components/LandingPage';
import Tiers from '@/components/Tiers';
import Try from '@/components/Try';

import Footer from '../components/Footer';
import Header from '../components/Header';

const Index = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && router.query.from !== 'practice') {
      router.push('/practice');
    }
  }, [session, router]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleRightArrowAction = () => {
    setCurrentSlide((prev) => (prev < 4 ? prev + 1 : prev));
  };

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
            color="gray"
            stroke="currentColor"
            className="size-14"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </button>
      </div>
    );

  const RightArrow = (
    clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined,
    hasNext: boolean
  ) =>
    hasNext && (
      <div className="absolute right-0 top-1/2 z-10 flex -translate-y-1/2 flex-row pb-36">
        <button onClick={clickHandler} aria-label="Next Slide">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            color="gray"
            stroke="currentColor"
            className="size-14 animate-pulse"
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

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="grow overflow-hidden">
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
          <LandingPage />
          <Features />
          <Demo />
          <Tiers />
          <Try />
        </Carousel>
      </div>
      <Footer />
      <div className="circles" style={{ zIndex: -1 }}>
        <FlyingText />
      </div>
    </div>
  );
};

export default Index;
