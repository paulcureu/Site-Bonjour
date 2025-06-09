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

export async function sendReservationEmail(
  to: string,
  name: string,
  date: string,
  time: string,
  guests: number,
) {
  const html = `
    <h2>Confirmare rezervare</h2>
    <p>Salut, ${name}!</p>
    <p>Rezervarea ta a fost înregistrată pentru:</p>
    <ul>
      <li><strong>Data:</strong> ${date}</li>
      <li><strong>Ora:</strong> ${time}</li>
      <li><strong>Nr. persoane:</strong> ${guests}</li>
    </ul>
    <p>Îți mulțumim că ai ales Restaurantul Bonjour!</p>
  `;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '2525'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Site Bonjour" <noreply@site-bonjour.com>',
    to,
    subject: '📅 Confirmare rezervare',
    html,
  });
}
