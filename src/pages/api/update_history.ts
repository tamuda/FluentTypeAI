import type { IncomingMessage, ServerResponse } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import clientPromise from '../../../lib/mongodb';
import authOptions from './auth/[...nextauth]';

export default async (
  req:
    | any
    | NextApiRequest
    | (IncomingMessage & { cookies: Partial<{ [key: string]: string }> }),
  res: any | ServerResponse<IncomingMessage> | NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions);
  const userEmail = (session as { user: { email: string } })?.user?.email;

  if (!userEmail) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (req.method === 'POST') {
    try {
      const { wpm } = req.body;

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
