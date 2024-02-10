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

interface TypingHistory {
  wpm: number;
  time: string;
  totalSessionMistakes: number;
  accuracy: number;
}

const StatsHistory = ({ user }: { user: any }) => {
  const [history, setHistory] = useState<TypingHistory[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);

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
    <div className="flex h-screen flex-col items-center justify-center overflow-scroll p-12 pb-44 md:flex-row">
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
      <div className="m-4 flex flex-1 flex-col justify-center bg-white bg-gradient-to-r from-teal-50 to-blue-100 p-4 text-center shadow-lg md:max-h-[50vh] md:max-w-[45vw]">
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
    </div>
  );
};

export default StatsHistory;
