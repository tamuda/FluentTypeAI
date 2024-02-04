import { useEffect, useState } from 'react';

interface TopTyper {
  username: string;
  maxWpm: number;
  meanAccuracy: number;
}

const TopTypersLeaderboard = () => {
  const [topTypers, setTopTypers] = useState<TopTyper[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');

  const fetchUsername = async () => {
    try {
      const response = await fetch(`/api/get_username`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }

      const data = await response.json();
      setUsername(data.username);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };

  fetchUsername();

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopTypers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center pb-40">
        <div className="blue-500 inline-block size-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 pb-40 md:flex-row">
      <div className="m-4 flex min-h-[33vh] min-w-[66vw] flex-col justify-center bg-white bg-gradient-to-r from-blue-100 to-teal-50 p-4 text-center shadow-xl">
        <h1 className="mb-4 text-2xl font-bold">
          Highest Average WPM Leaderboard
        </h1>
        <div className="overflow-auto">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-blue-200">
                <th className="text-center">Rank</th>
                <th className="text-center">Name</th>
                <th className="text-center">Max WPM</th>
                <th className="text-center">Mean Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {topTypers?.map((typer, index) => (
                <tr
                  key={index}
                  className={`text-center ${
                    typer.username === username
                      ? 'border-b font-bold'
                      : 'border-b'
                  }`}
                >
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">
                    {typer.username === username
                      ? `${typer.username} (You)`
                      : typer.username}
                  </td>
                  <td className="text-center">{typer.maxWpm}</td>
                  <td className="text-center">
                    {Math.ceil(typer.meanAccuracy)}%
                  </td>
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
