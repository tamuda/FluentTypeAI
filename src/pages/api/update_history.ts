import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import clientPromise from '../../../lib/mongodb';
import authOptions from './auth/[...nextauth]';

const isTimestampValid = (timestamp: string) => {
  const requestTime = new Date(parseInt(timestamp, 10));
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - requestTime.getTime();

  return Math.abs(timeDifference) < 1 * 60 * 1000;
};

const updateHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const userEmail = (session as { user: { email: string } })?.user?.email;

  if (!userEmail) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (req.method === 'POST') {
    const timestamp = req.headers['x-timestamp'] || req.body.timestamp;

    if (!timestamp || !isTimestampValid(timestamp)) {
      res.status(400).json({ message: 'Invalid or missing timestamp.' });
      return;
    }

    try {
      const { wpm } = req.body;

      if (typeof wpm !== 'number' || wpm < 0 || wpm > 250) {
        res.status(400).json({ message: 'Invalid wpm value' });
        return;
      }

      const client = await clientPromise;
      const db = client.db('fluenttype');
      const usersCollection = db.collection('users');

      const typingData = {
        time: new Date(),
        wpm,
      };

      await usersCollection.updateOne(
        { email: userEmail },
        {
          $push: {
            typingHistory: {
              $each: [typingData],
              $slice: -25,
            },
          },
        }
      );

      res.status(200).json({ message: 'Typing history updated' });
    } catch (error) {
      console.error('Error in update_history API:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default updateHistory;
