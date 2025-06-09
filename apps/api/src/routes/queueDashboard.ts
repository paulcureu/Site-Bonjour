// src/routes/queueDashboard.ts
import express, { Express } from 'express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'; // ✅ sub-modul corect
import { ExpressAdapter } from '@bull-board/express';

import { reservationQueue } from '@/queues/reservationQueue';

export function mountBullBoard(app: Express) {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  createBullBoard({
    queues: [new BullMQAdapter(reservationQueue)],
    serverAdapter,
  });

  app.use('/admin/queues', serverAdapter.getRouter());
}
