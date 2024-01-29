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
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TypingHistory {
  wpm: number;
  time: string;
}

const StatsHistory = ({ user }: { user: any }) => {
  const email = user.user?.email;
  const [history, setHistory] = useState<TypingHistory[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/get_history?email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }

        const data = await response.json();
        setHistory(data.typingHistory);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };

    fetchHistory();
  }, [email]);

  return (
    <div className="flex flex-col md:flex-row h-screen items-center justify-center p-6 pb-40">
      <div className="m-4 flex flex-1 flex-col justify-center bg-white bg-gradient-to-r from-blue-100 to-teal-50 p-4 text-center shadow-xl md:max-h-[50vh]">
        <h1 className="mb-4 text-xl font-bold">Typing History</h1>
        <div className="overflow-auto">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-blue-200">
                <th className="text-center">Session</th>
                <th className="text-center">WPM</th>
                <th className="text-center">Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((session, index) => (
                <tr key={index} className="border-b">
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{session.wpm}</td>
                  <td className="text-center">
                    {new Date(session.time).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="m-4 flex flex-1 flex-col justify-center rounded bg-white bg-gradient-to-r from-teal-50 to-blue-100 p-4 shadow-lg md:max-h-[50vh]">
        <h2 className="mb-4 text-xl font-bold">WPM Progression</h2>
        {history ? (
          <Line
            data={{
              labels: history.map((_, index) => `${index + 1}`),
              datasets: [
                {
                  label: 'WPM Over Time',
                  data: history.map((item) => item.wpm),
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1,
                },
              ],
            }}
            options={{ plugins: { legend: { display: false } } }}
          />
        ) : (
          <p>No data to display</p>
        )}
      </div>
    </div>
  );
};

export default StatsHistory;
