import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'node_modules/next-auth';

import clientPromise from '../../../../lib/mongodb';

async function connectToDatabase() {
  const client = await clientPromise;
  return client.db('fluenttype');
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      try {
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');

        const existingUser = await usersCollection.findOne({
          email: user.email,
        });
        if (!existingUser) {
          await usersCollection.insertOne({
            email: user.email,
            name: user.name,
            googleId: profile?.sub,
            typingHistory: [],
          });
        }

        return true;
      } catch (error) {
        console.error('Error signing in:', error);
        return false;
      }
    },
  },
});