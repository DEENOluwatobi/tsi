import nodemailer from 'nodemailer';

// Create transporter with your email service configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use 'gmail', 'outlook', or configure SMTP manually
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your app password (not regular password)
    },
});

// Alternative SMTP configuration (if not using Gmail)
// const transporter = nodemailer.createTransporter({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT || '587'),
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

export default transporter;