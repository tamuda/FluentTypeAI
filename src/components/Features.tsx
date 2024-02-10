import React from 'react';

const Features = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center pb-52">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="pb-8 text-center">
          <p className="pt-16 text-4xl font-extrabold text-gray-900 sm:mt-5 sm:text-5xl md:pt-1">
            <span className="z-50 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-4xl text-transparent md:text-6xl">
              What we offer
            </span>
          </p>
          <p className="mx-auto max-w-4xl text-lg text-gray-500">
            We both know the benefits of fast typing. We also both know that
            improving is boring and laborius. But that is because platforms you
            used before don&apos;t actually learn from you so you end up typing
            the same things over and over again. Let&apos;s change that.
          </p>
        </div>
        <div className="grid h-96 gap-8 overflow-auto lg:h-auto lg:grid-cols-3 lg:overflow-hidden">
          <FeatureCard
            title="AI-Powered Learning"
            description="Our AI learns your typing mistake patterns and tailors your text accordingly, so you type the least for the most improvement."
            text="We don't want you to waste your precious time - we want to help you improve through deliberate practice. Let our AI do the heavy lifting for you. 🤖"
            icon="🧠"
          />
          <FeatureCard
            title="Comprehensive Statistics"
            description="Track your progress with detailed stats on words-per-minute (WPM), accuracy, most frequent K-letter mistake patterns, and more."
            text="We'll break down your top mistake patterns & visualize your progress in each metric over time."
            icon="📊"
          />
          <FeatureCard
            title="Competitive Leaderboards"
            description="Climb the weekly leaderboard and see how you stack up against others."
            text="Compete with your friends and see who can type the fastest! There will be a longest streak leaderboard too, and biggest improvement leaderboard too! P.S. There will be rewards! 😉"
            icon="🏆"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  title,
  description,
  text,
  icon,
}: {
  title: string;
  description: string;
  text: string;
  icon: string;
}) => (
  <div className="relative flex flex-col items-center rounded-lg bg-white bg-gradient-to-r from-blue-100 to-teal-100 p-6 shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105">
    <div className="text-6xl">{icon}</div>
    <h3 className="mt-5 text-xl font-bold text-gray-900">{title}</h3>
    <p className="mt-2  pb-6 text-center text-base">{description}</p>
    <p className="mt-2 text-center text-base text-gray-600">{text}</p>
  </div>
);

export default Features;
