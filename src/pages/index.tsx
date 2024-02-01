import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

import FlyingText from '../components/FlyingText';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LandingPage from '../components/LandingPage';

const Index = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated and not redirected from /practice
    if (session && router.query.from !== 'practice') {
      router.push('/practice');
    }
  }, [session, router]);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex grow flex-col">
        <LandingPage />
      </div>
      <Footer />
      <div className="circles" style={{ zIndex: -1 }}>
        <FlyingText />
      </div>
    </div>
  );
};

export default Index;
