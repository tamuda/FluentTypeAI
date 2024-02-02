import { useEffect, useState } from 'react';

interface TopTyper {
  name: string;
  maxWpm: number;
  accuracy: number;
}

const TopTypersLeaderboard = () => {
  const [topTypers, setTopTypers] = useState<TopTyper[] | undefined>(undefined);

  useEffect(() => {
    const fetchTopTypers = async () => {
      try {
        const response = await fetch('/api/get_leaderboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch top typers');
        }

        const data = await response.json();
        setTopTypers(data);
      } catch (error) {
        console.error('Failed to fetch top typers:', error);
        setTopTypers([]);
      }
    };

    fetchTopTypers();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen justify-center p-6 pb-40 md:flex-row">
      <div className="m-4 flex min-h-[33vh] min-w-[66vw] flex-col justify-center bg-white bg-gradient-to-r from-blue-100 to-teal-50 p-4 text-center shadow-xl">
        <h1 className="mb-4 text-xl font-bold">Weekly Leaderboard (top 10)</h1>
        <div className="overflow-auto">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-blue-200">
                <th className="text-center">Rank</th>
                <th className="text-center">Name</th>
                <th className="text-center">WPM</th>
              </tr>
            </thead>
            <tbody>
              {topTypers?.map((typer, index) => (
                <tr key={index} className="border-b">
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{typer.name}</td>
                  <td className="text-center">{typer.maxWpm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopTypersLeaderboard;
