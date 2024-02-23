import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import clientPromise from '../../../lib/mongodb';
import authOptions from './auth/[...nextauth]';

const updateUpgradeStatus = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions);
  const userEmail = (session as { user: { email: string } })?.user?.email;

  if (!userEmail) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db('fluenttype');
      const usersCollection = db.collection('users');

      await usersCollection.updateOne(
        { email: userEmail },
        { $set: { clicked_upgrade: true } }
      );

      res.status(200).json({ message: 'User upgrade status updated' });
    } catch (error) {
      console.error('Error in update_upgrade_status API:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default updateUpgradeStatus;
