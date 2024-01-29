import clientPromise from '../../../lib/mongodb';

export default async function handler(
  req: { method: string; body: { wpm: any; userEmail: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): void; new (): any };
      end: { (arg0: string): void; new (): any };
    };
    setHeader: (arg0: string, arg1: string[]) => void;
  }
) {
  if (req.method === 'POST') {
    try {
      const { wpm, userEmail } = req.body;
      if (!userEmail) {
        return res.status(400).json({ message: 'User email is required' });
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
}
