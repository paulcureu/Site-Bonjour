import nodemailer from 'nodemailer';
import mjml from 'mjml';
import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';
import { env } from '../env';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

console.log('✅ Nodemailer transport-ul a fost configurat.');

export async function sendReservationEmail(to: string, name: string) {
  try {
    const templatePath = path.join(__dirname, '../templates/reservationConfirmation.mjml');
    const mjmlTemplate = await fs.readFile(templatePath, 'utf-8');
    const template = Handlebars.compile(mjmlTemplate);
    const mjmlContent = template({ name: name });
    const { html } = mjml(mjmlContent);

    await transporter.sendMail({
      from: env.EMAIL_FROM,
      to: to,
      subject: '✔ Rezervare confirmată la Restaurant Bonjour',
      html: html,
    });
  } catch (error) {
    console.error('Eroare în funcția sendReservationEmail:', error);
    throw error;
  }
}

export async function sendResetPasswordEmail(to: string, link: string) {
  const html = `
    <h2>Resetare parolă</h2>
    <p>Ați solicitat resetarea parolei. Apăsați pe linkul de mai jos pentru a continua:</p>
    <a href="${link}" target="_blank" style="padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Resetează Parola</a>
    <p>Dacă nu ați solicitat acest lucru, puteți ignora acest email.</p>
  `;

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject: '🔐 Resetare parolă',
    html,
  });
}
