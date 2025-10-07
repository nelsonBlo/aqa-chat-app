/**
 * Chat Room Application - Backend Server
 * 
 * This server provides:
 * - User authentication with JWT tokens
 * - Real-time messaging via WebSockets
 * - Message persistence in MongoDB
 * - REST API endpoints for login and message history
 * 
 * @author Nelson Bocanegra López
 * @version 1.0.0
 */

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Configure Socket.IO with CORS for real-time communication
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// ==================== MIDDLEWARE CONFIGURATION ====================
app.use(cors());                    // Enable CORS for cross-origin requests
app.use(express.json());            // Parse JSON request bodies
app.use(express.static('public'));  // Serve static files from public directory

// ==================== DATABASE CONFIGURATION ====================
// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/chatdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ==================== DATABASE SCHEMAS ====================
// User schema for authentication
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Message schema for chat messages
const messageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Create MongoDB models
const User = mongoose.model('User', userSchema);
const Message = mongoose.model('Message', messageSchema);

// ==================== AUTHENTICATION CONFIGURATION ====================
// JWT Secret for token signing (in production, use environment variable)
const JWT_SECRET = 'your-secret-key';

// ==================== REST API ROUTES ====================
// POST /api/login - User authentication endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Hardcoded users for demo purposes
    // In production, these would be stored in the database
    const hardcodedUsers = [
      { username: 'Ana', password: 'password123' },
      { username: 'Juan', password: 'password456' },
      { username: 'Charly', password: 'password789' }
    ];
    
    // Find user by username
    const user = hardcodedUsers.find(u => u.username === username);
    
    // Validate credentials
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token for authenticated user
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, username });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/messages - Retrieve chat message history
app.get('/api/messages', async (req, res) => {
  try {
    // Fetch all messages from database, sorted by timestamp (oldest first)
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/messages/clear - Clear all messages from database (for testing)
app.delete('/api/messages/clear', async (req, res) => {
  try {
    // Delete all messages from the database
    await Message.deleteMany({});
    res.json({ message: 'All messages cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== WEBSOCKET CONNECTION HANDLING ====================
// Handle real-time communication via Socket.IO
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Handle user joining the chat
  socket.on('join', (username) => {
    socket.username = username;
    // Notify other users that someone joined
    socket.broadcast.emit('userJoined', username);
  });
  
  // Handle incoming chat messages
  socket.on('message', async (data) => {
    try {
      // Create new message document
      const message = new Message({
        username: data.username,
        message: data.message
      });
      
      // Save message to database
      await message.save();
      
      // Broadcast message to all connected clients
      io.emit('message', {
        username: data.username,
        message: data.message,
        timestamp: message.timestamp
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });
  
  // Handle user disconnection
  socket.on('disconnect', () => {
    if (socket.username) {
      // Notify other users that someone left
      socket.broadcast.emit('userLeft', socket.username);
    }
    console.log('User disconnected:', socket.id);
  });
});

// ==================== SERVER STARTUP ====================
// Start the server on specified port (default: 5000)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
