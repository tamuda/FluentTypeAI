import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import clientPromise from '../../../lib/mongodb';
import authOptions from './auth/[...nextauth]';

const getMistakes = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Method Not Allowed' });
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  const userEmail = (session as { user: { email: string } })?.user?.email;

  if (!userEmail) {
    res.status(401).send({ message: 'Unauthorized' });
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db('fluenttype');
    const usersCollection = db.collection('users');

    const mistakes = await usersCollection
      .findOne({ email: userEmail })
      .then((user) => user?.mistakes || {});

    res.status(200).json({ mistakes });
  } catch (error) {
    console.error('Error retrieving typing mistakes:', error);
    res.status(500).send({ message: 'Server Error' });
  }
};

export default getMistakes;
