import React from 'react';

import FlyingText from '../components/FlyingText';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LandingPage from '../components/LandingPage';

const Index = () => {
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
