const express = require('express');
const app = express();
const PORT =process.env.PORT||3000;
const http = require('http');
const {Socket}=require('engine.io');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // FIXED

app.get('/', (req, res) => {
  res.render('index');
});

// SOCKET.IO
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('message', (msg) => {
    io.emit('message', msg); // FIXED: ab sab ko message jayega
  });

});

server.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
