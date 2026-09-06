import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import restaurantRoutes from './routes/restaurant.routes.js';
import orderRoutes from './routes/order.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);

// Root & API Info Endpoints
app.get(['/', '/api'], (req, res) => {
  res.json({
    name: 'CraveExpress Backend Core API',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      health: '/api/health',
      restaurants: '/api/restaurants',
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/me'
      },
      orders: {
        create: 'POST /api/orders',
        list: 'GET /api/orders',
        updateStatus: 'PATCH /api/orders/:id/status'
      }
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CraveExpress Backend Core API',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 CraveExpress Backend Server running on http://localhost:${PORT}`);
});
