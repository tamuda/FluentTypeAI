import React from 'react';

const featuresList = [
  'Typing Analysis',
  'Statistics & Progress',
  'LLM Text Generation',
  'Custom Prompting',
  'Streak Tracking',
  'Detailed Statistics',
  'Priority Support & Contact',
];

const tiers = [
  {
    title: 'Current',
    price: 'Free',
    features: [
      'Typing Analysis',
      'Statistics & Progress',
      'LLM Text Generation',
    ],
    comparisonText: 'Always free',
  },
  {
    title: 'Monthly',
    price: '$9.99',
    features: [
      'Typing Analysis',
      'Statistics & Progress',
      'LLM Text Generation',
      'Custom Prompting',
      'Streak Tracking',
      'Detailed Statistics',
    ],
    comparisonText: '~2 cups of coffee',
    highlight: true,
  },
  {
    title: 'Annual',
    price: '$39.99',
    features: [
      'Typing Analysis',
      'Statistics & Progress',
      'LLM Text Generation',
      'Custom Prompting',
      'Streak Tracking',
      'Detailed Statistics',
      'Priority Support & Contact',
    ],
    comparisonText: '~8 cups of coffee',
    originalPrice: '$119',
  },
];

const TiersUpdated = () => {
  return (
    <div className="flex flex-col items-center justify-center md:pt-16">
      <div className="text-center">
        <p className="text-2xl font-extrabold text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          <span className="inline-block bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            What we offer
          </span>
        </p>
        <p className="mx-auto mt-2 text-sm text-gray-500 sm:text-base md:text-lg lg:max-w-4xl xl:max-w-5xl">
          We&apos;re confident we can help you improve.
        </p>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-5 px-4 text-sm md:mt-10 md:text-lg">
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
    <h3 className="text-base font-bold text-gray-900 md:text-2xl">{title}</h3>
    <div className="md:mt-2">
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
    <ul className="ml-2 mt-2 space-y-2 text-xs md:mt-4 md:text-lg">
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
