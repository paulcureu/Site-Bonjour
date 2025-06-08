import nodemailer from 'nodemailer';

export async function sendResetPasswordEmail(to: string, link: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '2525'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = `
    <h2>Resetare parolă</h2>
    <p>Ai cerut resetarea parolei. Apasă pe linkul de mai jos:</p>
    <a href="${link}">${link}</a>
    <p>Dacă nu ai cerut acest lucru, ignoră acest email.</p>
  `;

  await transporter.sendMail({
    from: '"Site Bonjour" <noreply@site-bonjour.com>',
    to,
    subject: '🔐 Resetare parolă',
    html,
  });
}
