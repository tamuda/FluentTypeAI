import React from 'react';

const featuresList = [
  'Typing Analysis',
  'Leaderboard Access',
  'Statistics & Progress',
  'GPT-2 Text Generation',
  'GPT-4 Text Generation',
  'Streak Tracking',
  'Goal Tracking',
  'Detailed Statistics',
  'Priority Support',
  'Developer Contact',
];

const tiers = [
  {
    title: 'Free Plan',
    price: 'Free',
    features: [
      'Typing Analysis',
      'Leaderboard Access',
      'Statistics & Progress',
      'GPT-2 Text Generation',
    ],
    comparisonText: 'Always free',
  },
  {
    title: 'Monthly',
    price: '$9.99/month',
    features: [
      'Typing Analysis',
      'Leaderboard Access',
      'Statistics & Progress',
      'GPT-2 Text Generation',
      'GPT-4 Text Generation',
      'Streak Tracking',
      'Goal Tracking',
      'Detailed Statistics',
    ],
    comparisonText: '~2 cups of coffee',
    highlight: true,
  },
  {
    title: 'Annual',
    price: '$39.99/year',
    features: [
      'Typing Analysis',
      'Leaderboard Access',
      'Statistics & Progress',
      'GPT-2 Text Generation',
      'GPT-4 Text Generation',
      'Streak Tracking',
      'Goal Tracking',
      'Detailed Statistics',
      'Priority Support',
      'Developer Contact',
    ],
    comparisonText: '~8 cups of coffee',
    originalPrice: '$119.88/year',
  },
];

const TiersUpdated = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-40">
      <div className="text-center">
        <p className="text-4xl font-extrabold text-gray-900 sm:mt-5 sm:text-5xl">
          <span className="z-50 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-6xl text-transparent">
            Ways we offer
          </span>
        </p>
        <p className="mx-auto mt-4 max-w-4xl text-xl text-gray-500">
          Not convinced? Try the free tier and see for yourself. We&apos;re
          confident we can help you improve.
        </p>
        <p className="mx-auto max-w-4xl text-xl text-gray-500">
          Convinced? We recommend the monthly plan until you&apos;ve improved to
          your liking.
        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        {tiers.map((tier, index) => (
          <TierCard key={index} {...tier} />
        ))}
      </div>
    </div>
  );
};

const TierCard = ({
  title,
  price,
  features,
  comparisonText,
  highlight = false,
  originalPrice = '',
}: {
  title: string;
  price: string;
  features: string[];
  comparisonText: string;
  highlight?: boolean;
  originalPrice?: string;
}) => (
  <div
    className={`relative flex flex-col items-center rounded-lg border p-6 shadow-xl transition duration-500 ease-in-out ${
      highlight ? 'bg-gradient-to-r from-blue-100 to-teal-50' : 'bg-white'
    } hover:-translate-y-1 hover:scale-105`}
  >
    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    <div className="mt-2">
      {originalPrice && (
        <span className="text-lg font-semibold text-red-500 line-through">
          {originalPrice}
        </span>
      )}
      <span className={`text-lg font-semibold ${originalPrice ? 'ml-2' : ''}`}>
        {price}
      </span>
    </div>
    <p className="mt-2 text-sm text-gray-600">{comparisonText}</p>
    <ul className="mt-4 space-y-2">
      {featuresList.map((feature) => (
        <li key={feature} className="flex items-center space-x-2">
          {features.includes(feature) ? (
            <svg
              className="size-4 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="size-4 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          <span
            className={`text-gray-700 ${
              !features.includes(feature) ? 'text-opacity-50' : ''
            }`}
          >
            {feature}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default TiersUpdated;
