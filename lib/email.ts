import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'fluenttypeai@gmail.com',
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

export const sendWelcomeEmail = async (userEmail: string) => {
  const mailOptions = {
    from: 'welcome@fluenttypeai.com',
    to: userEmail,
    subject: 'Welcome to FluentTypeAI 🚀',
    text: 'Thank you for registering. We are excited to have you on board! Here is a link to our app: https://fluenttypeai.com. Enjoy! 🎉',
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
