require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const matchRouter = require('./routes/match');
const schemesRouter = require('./routes/schemes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/grabyojana';

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GrabYojana API is running',
    timestamp: new Date().toISOString(),
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use('/api', matchRouter);
app.use('/api', schemesRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    const maskedURI = MONGODB_URI.replace(/:\/\/[^@]+@/, '://****:****@');
    console.log(`MongoDB connected -> ${maskedURI}`);

    app.listen(PORT, () => {
      console.log(`GrabYojana API running on http://localhost:${PORT}`);
      console.log(`Health: http://localhost:${PORT}/health`);
      console.log(`Match:  POST http://localhost:${PORT}/api/match`);
      console.log(`Schemes: GET http://localhost:${PORT}/api/schemes`);
      console.log(`Stats:  GET http://localhost:${PORT}/api/stats`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
}

startServer();
