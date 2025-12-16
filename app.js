const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Render chat page
app.get('/', (req, res) => {
  res.render('index');
});

// Socket.IO logic
io.on('connection', socket => {
  console.log('A user connected: ' + socket.id);

  socket.on('message', msg => {
    // Broadcast to everyone else
    socket.broadcast.emit('message', { text: msg, sender: false });
    
    // Send back to sender
    socket.emit('message', { text: msg, sender: true });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected: ' + socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
