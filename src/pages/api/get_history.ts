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
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  const userEmail = (session as { user: { email: string } })?.user?.email;

  if (!userEmail) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db('fluenttype');
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email: userEmail });

    res.status(200).json({ typingHistory: user?.typingHistory || [] });
  } catch (error) {
    console.error('Error retrieving typing history:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
