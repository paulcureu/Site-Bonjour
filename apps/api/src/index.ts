import express from 'express';

const app = express();
const port = 3000;

app.get('/api/v1/status', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
