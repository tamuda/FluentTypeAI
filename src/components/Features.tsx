import React from 'react';

const Features = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 pb-48">
      <div className="w-full max-w-6xl px-4">
        <div className="text-center">
          <p className="text-2xl font-extrabold text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            <span className="inline-block bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
              How we offer
            </span>
          </p>
          <p className="mx-auto mt-2 text-sm text-gray-500 sm:text-base md:text-lg lg:max-w-4xl xl:max-w-5xl">
            We both know the benefits of fast typing. We also both know that
            improving is boring and laborious. change that.
          </p>
        </div>
        <div className="mt-3 flex flex-row justify-center gap-4 sm:gap-6 md:mt-8">
          <FeatureCard
            title="AI-Powered Learning"
            description="Our custom LLMs and Bayesian networks learn your typing mistake patterns and tailors your text accordingly."
            text="Let our AI tailor you practice 🤖"
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
            text="Compete with your friends and see who can type the fastest! There will be a longest streak leaderboard too, and biggest improvement leaderboard too! 😉"
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
  <div className="flex w-full max-w-xs flex-col items-center rounded-lg bg-white bg-gradient-to-r from-blue-100 to-teal-100 p-4 text-center shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 md:p-6">
    <div className="text-xs md:text-5xl">{icon}</div>
    <h3 className="mt-2 text-xs font-bold text-gray-900 md:text-lg">{title}</h3>
    <p className="mt-2 text-xs text-gray-600 md:text-sm">{description}</p>
    <p className="text-xs text-gray-600 md:block md:pt-6 md:text-sm">{text}</p>
  </div>
);

export default Features;
