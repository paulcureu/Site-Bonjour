import nodemailer from 'nodemailer';
import { env } from '../env';

// Funcția ta originală, adaptată ușor
export async function sendReservationEmail(
  to: string,
  name: string,
  // ... poți adăuga date, time, guests dacă vrei să le pui în email
) {
  const html = `
    <h2>Confirmare rezervare</h2>
    <p>Salut, ${name}!</p>
    <p>Rezervarea ta a fost înregistrată cu succes.</p>
    <p>Îți mulțumim că ai ales Restaurantul Bonjour!</p>
  `;

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject: '📅 Confirmare rezervare',
    html,
  });
}
