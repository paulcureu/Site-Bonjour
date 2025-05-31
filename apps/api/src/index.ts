import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();

// 🔐 Helmet - toate header-ele de securitate activate
app.use(helmet());

// 🔐 Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://site-bonjour.vercel.app'],
    },
  }),
);

// 🔐 Referrer Policy
app.use(
  helmet.referrerPolicy({
    policy: 'no-referrer',
  }),
);

// 🔐 Optional – COEP (poți seta la false dacă ai probleme)
app.use(helmet.crossOriginEmbedderPolicy({ policy: 'require-corp' }));

// 🌐 CORS – whitelist pentru frontend local și live
const whitelist = ['http://localhost:5173', 'https://site-bonjour.vercel.app'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

// 🧠 Middleware general
app.use(express.json());

// 🔐 Auth routes
app.use('/api/v1/auth', authRoutes);

// ✅ Health check
app.get('/api/v1/status', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// 🚀 Start server
app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
