import { useEffect, useState } from 'react';

interface TopTyper {
  name: string;
  maxWpm: number;
  accuracy: number;
}

const TopTypersLeaderboard = () => {
  const [topTypers, setTopTypers] = useState<TopTyper[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopTypers = async () => {
      try {
        setIsLoading(true);
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
      <div className="flex h-screen items-center justify-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="size-10 pb-40 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 pb-40 md:flex-row">
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