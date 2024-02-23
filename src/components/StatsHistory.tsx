import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import chartTrendline from 'chartjs-plugin-trendline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  chartTrendline
);

const featuresList = [
  'Typing Analysis',
  'Statistics & Progress',
  'Leaderboard',
  'Bayesian Text Generation',
  'Streak Tracking',
  'LLM Text Generation',
  'Custom Prompting',
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
      'Leaderboard',
      'Bayesian Text Generation',
      'Streak Tracking',
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
      'Detailed Statistics',
      'Priority Support & Contact',
    ],
    comparisonText: '~8 cups of coffee',
    originalPrice: '$119',
  },
];

interface TypingHistory {
  wpm: number;
  time: string;
  totalSessionMistakes: number;
  accuracy: number;
}

const StatsHistory = ({ user }: { user: any }) => {
  const [history, setHistory] = useState<TypingHistory[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);
  const selectedTier = tiers[0];

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/get_history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }

        const data = await response.json();

        let history = data.typingHistory;

        history.sort(
          (
            a: { time: string | number | Date },
            b: { time: string | number | Date }
          ) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        setHistory(history);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  useEffect(() => {
    const fetchMistakes = async () => {
      try {
        const response = await fetch(`/api/get_mistakes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }

        const data = await response.json();
        const mistakes = data.mistakes;

        setMistakes(mistakes);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };

    if (user) {
      fetchMistakes();
    }
  }, [user]);

  return (
    <div className="flex h-screen flex-col items-center justify-center p-12 pb-44 md:flex-row">
      <div className="flex flex-1 flex-col">
        <div className="mb-4 flex-1 flex-col justify-center bg-white bg-gradient-to-r from-teal-50 to-blue-100 p-4 text-center shadow-xl md:max-h-[35vh] md:max-w-full">
          <h1 className="mb-4 text-xl font-bold">History</h1>
          <div className="max-h-[20vh] overflow-auto">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-blue-200">
                  <th>Session</th>
                  <th>WPM</th>
                  <th>Accuracy</th>
                  <th># of Mistakes</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {history.map((session, index) => (
                  <tr key={index} className="border-b">
                    <td className="text-center">{history.length - index}</td>
                    <td className="text-center">{session.wpm}</td>
                    <td className="text-center">{session.accuracy}%</td>
                    <td className="text-center">
                      {session.totalSessionMistakes}
                    </td>
                    <td className="text-center">
                      {new Date(session.time).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-4 flex-1 flex-col justify-center bg-white bg-gradient-to-r from-teal-50 to-blue-100 p-4 text-center shadow-lg md:max-h-[35vh] md:max-w-full">
          <h2 className="mb-4 text-xl font-bold">Statistics</h2>
          <div className="max-h-[30vh] overflow-auto">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-blue-200">
                  <th>Statistic</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="text-center">Average Accuracy</td>
                  <td className="text-center">
                    {history.length > 0
                      ? isNaN(
                          Math.ceil(
                            history.reduce(
                              (acc, curr) => acc + curr.accuracy,
                              0
                            ) / history.length
                          )
                        ) ||
                        Math.ceil(
                          history.reduce(
                            (acc, curr) => acc + curr.accuracy,
                            0
                          ) / history.length
                        ) <= 0
                        ? 'N/A'
                        : Math.ceil(
                            history.reduce(
                              (acc, curr) => acc + curr.accuracy,
                              0
                            ) / history.length
                          ) + '%'
                      : 'N/A'}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="text-center">Best WPM</td>
                  <td className="text-center">
                    {history.length > 0
                      ? Math.max(...history.map((session) => session.wpm)) +
                        ' WPM'
                      : 'N/A'}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="text-center">Average WPM </td>
                  <td className="text-center">
                    {history.length > 0
                      ? Math.ceil(
                          history.reduce((acc, curr) => acc + curr.wpm, 0) /
                            history.length
                        ) + ' WPM'
                      : 'N/A'}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="text-center">Worst WPM</td>
                  <td className="text-center">
                    {history.length > 0
                      ? Math.min(...history.map((session) => session.wpm)) +
                        ' WPM'
                      : 'N/A'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-4 flex-1 flex-col justify-center bg-white bg-gradient-to-r from-teal-50 to-blue-100 p-4 text-center shadow-lg md:max-h-[30vh] md:max-w-full">
          <h2 className="mb-2 text-xl font-bold">
            Most frequent mistakes made
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 text-center">
            {Object.entries(mistakes).length > 0 ? (
              Object.entries(mistakes).map(([mistake, count]) => (
                <span
                  key={mistake}
                  className="rounded bg-red-200 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-300 dark:text-red-900"
                >
                  <span key={mistake} className="font-bold">
                    {`${mistake} : ${count}`}
                  </span>
                </span>
              ))
            ) : (
              <span className="text-black">None yet</span>
            )}
          </div>
        </div>
      </div>
      <div className="ml-4 flex w-1/2 flex-col gap-2">
        <div className="flex-1 flex-col justify-center bg-white bg-gradient-to-r from-teal-50 to-blue-100 p-4 text-center shadow-lg md:max-h-[50vh] md:max-w-[45vw]">
          <h2 className="mb-4 text-xl font-bold">Progression</h2>
          {history ? (
            <Line
              data={{
                labels: history.map((_, index) => `${index + 1}`),
                datasets: [
                  {
                    label: 'WPM',
                    data: [...history.map((item) => item.wpm)].reverse(),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    trendlineLinear: {
                      borderColor: 'red',
                      colorMin: 'red',
                      colorMax: 'red',
                      lineStyle: 'dotted',
                      width: 2,
                    },
                    borderWidth: 4,
                  } as any,
                  {
                    label: 'WPM Trendline',
                    data: [],
                    borderColor: 'red',
                    borderWidth: 2,
                    lineStyle: 'dashed',
                    borderDash: [5, 5],
                    pointRadius: 0,
                    pointHitRadius: 0,
                    pointHoverRadius: 0,
                    pointHoverBorderWidth: 0,
                  },
                  {
                    label: 'Accuracy',
                    data: [...history.map((item) => item.accuracy)].reverse(),
                    borderColor: 'rgb(54, 162, 235)',
                    tension: 0.1,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  legend: {
                    display: true,
                    onClick: () => {},
                  },
                },
              }}
            />
          ) : (
            <p>No data to display</p>
          )}
        </div>
        {tiers.map((tier, index) => {
          if (tier === selectedTier) {
            return <TierCard key={index} {...tier} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const TierCard = ({
  features,
}: {
  title: string;
  price: string;
  features: string[];
  comparisonText: string;
  highlight?: boolean;
  originalPrice?: string;
}) => (
  <div className="flex-1 flex-col justify-center bg-white bg-gradient-to-r from-teal-50 to-blue-100 p-4 text-center shadow-lg md:max-h-[45vh] md:max-w-[45vw]">
    <h3 className="text-base font-bold text-gray-900 md:text-xl">Current Plan</h3>
    <div className="flex flex-row items-center justify-between px-6">
      <ul className="ml-2 mt-2 space-y-2 text-xs md:mt-4 md:text-sm">
        {featuresList
          .filter((feature) => features.includes(feature))
          .map((feature) => (
            <li key={feature} className="flex items-center space-x-2">
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
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
      </ul>
      <ul className="ml-2 mt-2 space-y-2 text-xs md:mt-4 md:text-sm">
        {featuresList
          .filter((feature) => !features.includes(feature))
          .map((feature) => (
            <li key={feature} className="flex items-center space-x-2">
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

              <span
                className={`text-sm text-gray-700 ${
                  features.includes(feature) ? 'text-opacity-50' : ''
                }`}
              >
                {feature}
              </span>
            </li>
          ))}
      </ul>
      <Link
        href="/upgrade"
        className="h-1/2 items-center justify-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Upgrade
      </Link>
    </div>
  </div>
);

export default StatsHistory;
