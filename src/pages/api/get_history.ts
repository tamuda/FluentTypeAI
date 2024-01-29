import clientPromise from '../../../lib/mongodb';

export default async function handler(
  req: { method: string; query: { email: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: { typingHistory?: any; message?: string }): void;
        new (): any;
      };
      end: { (arg0: string): void; new (): any };
    };
    setHeader: (arg0: string, arg1: string[]) => void;
  }
) {
  if (req.method === 'GET') {
    try {
      const userEmail = req.query.email;

      const client = await clientPromise;
      const db = client.db('fluenttype');
      const usersCollection = db.collection('users');

      const user = await usersCollection.findOne({ email: userEmail });

      res.status(200).json({ typingHistory: user?.typingHistory || [] });
    } catch (error) {
      console.error('Error retrieving typing history:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
