require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Route imports
const customerRoutes = require('./src/routes/customerRoutes');
const sellerRoutes = require('./src/routes/sellerRoutes');
const productRoutes = require('./src/routes/productRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

// AI module initialization
const { initClassifier } = require('./src/services/reviewAnalyzer');

// ─────────────────────────────────────────────
// Express App Setup
// ─────────────────────────────────────────────
const app = express();
const server = http.createServer(app);

// Socket.io Setup — real-time event bus (replaces Kinesis + SNS)
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Make io accessible to routes/controllers
app.set('io', io);

// ─────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting (generous for demo)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Aegis Trust & Safety Engine',
    timestamp: new Date().toISOString(),
    modules: {
      imageAnalyzer: '✅ Active',
      reviewAnalyzer: '✅ Active',
      trustEngine: '✅ Active',
      socketIO: '✅ Active'
    }
  });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Aegis Backend is running!', version: '2.0.0' });
});

// API Routes
app.use('/api/customer', customerRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─────────────────────────────────────────────
// Socket.io Real-Time Event System
// ─────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  // Join role-specific rooms for targeted updates
  socket.on('join-room', (room) => {
    socket.join(room);
    console.log(`📡 ${socket.id} joined room: ${room}`);
  });

  // Dashboard subscription
  socket.on('subscribe-dashboard', ({ role, userId }) => {
    socket.join(`dashboard-${role}-${userId}`);
    socket.join(`dashboard-${role}`); // role-wide room
    socket.join('admin'); // everyone can see admin events
    console.log(`📊 ${userId} subscribed to ${role} dashboard`);
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

// Utility: Emit event to all connected clients
app.emitEvent = (eventType, data) => {
  console.log(`📡 Emitting event: ${eventType}`, data?.summary || '');
  io.emit(eventType, {
    type: eventType,
    data,
    timestamp: new Date().toISOString()
  });
};

// Emit to specific room
app.emitToRoom = (room, eventType, data) => {
  console.log(`📡 Emitting ${eventType} to room ${room}`);
  io.to(room).emit(eventType, {
    type: eventType,
    data,
    timestamp: new Date().toISOString()
  });
};

// ─────────────────────────────────────────────
// Server Start
// ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Initialize AI modules
    console.log('🧠 Initializing Aegis AI Engine...');
    await initClassifier();
    console.log('✅ Review Analyzer classifier trained and ready');

    server.listen(PORT, () => {
      console.log('');
      console.log('═══════════════════════════════════════════');
      console.log('   🛡️  AEGIS TRUST & SAFETY ENGINE v2.0');
      console.log('═══════════════════════════════════════════');
      console.log(`   🚀 Server:    http://localhost:${PORT}`);
      console.log(`   📡 Socket.io: ws://localhost:${PORT}`);
      console.log(`   🏥 Health:    http://localhost:${PORT}/health`);
      console.log('');
      console.log('   AI Modules:');
      console.log('   ├── 🖼️  Image Integrity Analyzer (sharp + Rekognition)');
      console.log('   ├── 📝 Review Fraud Detector (natural + Comprehend)');
      console.log('   ├── 🎯 Trust Scoring Engine (dynamic)');
      console.log('   └── 🔊 Audio Review Pipeline (Transcribe)');
      console.log('');
      console.log('   Real-Time Events: Socket.io ✅');
      console.log('═══════════════════════════════════════════');
      console.log('');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = { app, server, io };
