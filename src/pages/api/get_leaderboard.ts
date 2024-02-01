import type { Document } from 'mongodb';

import clientPromise from '../../../lib/mongodb';

export default async function handler(
  req: { method: string },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: Document[]): void; new (): any };
      end: { (arg0: string): void; new (): any };
    };
    setHeader: (arg0: string, arg1: string[]) => void;
  }
) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('fluenttype');
      const usersCollection = db.collection('users');

      const leaderboard = await usersCollection
        .aggregate([
          { $unwind: '$typingHistory' },
          {
            $group: {
              _id: '$email',
              name: { $first: '$name' },
              maxWpm: { $max: '$typingHistory.wpm' },
            },
          },
          { $sort: { maxWpm: -1 } },
          { $limit: 10 },
        ])
        .toArray();

      res.status(200).json(leaderboard);
    } catch (error) {
      console.error('Error retrieving leaderboard:', error);
      res.status(500);
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
