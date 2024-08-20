const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/dotenv');
const { saveMessage } = require('./controllers/messageController'); // Import the function

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    io.emit('message', message);
    saveMessage(message);  // Save message to DB
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use('/api', require('./routes/messageRoutes'));

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
