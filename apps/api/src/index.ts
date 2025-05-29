import express from 'express';
import { env } from './env';
import { logger } from './logger';

const app = express();
const startTime = Date.now();

app.get('/api/v1/status', (req, res) => {
  const uptime = (Date.now() - startTime) / 1000;
  res.status(200).json({
    status: 'ok',
    uptime,
    timestamp: new Date().toISOString(),
  });
});

app.listen(Number(env.PORT), () => {
  logger.info(`Server started on port ${env.PORT}`);
});
