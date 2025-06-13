import nodemailer from 'nodemailer';
import { env } from '../env';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export async function sendReservationEmail(to: string, name: string) {
  const html = `
    <h2>Confirmare rezervare</h2>
    <p>Salut, ${name}!</p>
    <p>Rezervarea ta a fost înregistrată cu succes.</p>
    <p>Îți mulțumim că ai ales Restaurantul Bonjour!</p>
  `;

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject: '📅 Confirmare rezervare',
    html,
  });
}

export async function sendResetPasswordEmail(to: string, link: string) {
  const html = `
        <h2>Resetare parolă</h2>
        <p>Ai cerut resetarea parolei. Apasă pe linkul de mai jos:</p>
        <a href="${link}">${link}</a>
        <p>Dacă nu ai cerut acest lucru, ignoră acest email.</p>
    `;

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject: '🔐 Resetare parolă',
    html,
  });
}
