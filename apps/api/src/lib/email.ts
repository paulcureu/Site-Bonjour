import nodemailer from 'nodemailer';
import mjml from 'mjml';
import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';
import { env } from '../env';

// Creăm un "transportor" reutilizabil
const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  // CORECȚIE: Nodemailer se așteaptă ca portul să fie de tip Number.
  port: Number(env.SMTP_PORT),
  // secure: true // decomentează dacă folosești portul 465 (ex: pt. Gmail)
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

console.log('✅ Nodemailer transport-ul a fost configurat.');

// Funcția de trimitere a email-ului pentru rezervare
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
