import winston from 'winston';

// Comentăm importurile Logtail, ca să oprim trimiterea de loguri la Logtail
// import { Logtail } from '@logtail/node'
// import { LogtailTransport } from '@logtail/winston'

// const logtail = new Logtail(env.LOGTAIL_TOKEN)

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    // new LogtailTransport(logtail) // comentat temporar
  ],
});
