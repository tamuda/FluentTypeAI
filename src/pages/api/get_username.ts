import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import clientPromise from '../../../lib/mongodb';
import authOptions from './auth/[...nextauth]';

const getUsername = async (req: NextApiRequest, res: NextApiResponse) => {
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
    const user = await usersCollection.findOne(
      { email: userEmail },
      { projection: { username: 1, _id: 0 } }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ username: user.username });
  } catch (error) {
    console.error('Error retrieving user username:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export default getUsername;
