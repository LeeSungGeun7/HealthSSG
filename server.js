const express = require('express');
const next = require('next');
const http = require('http');
const socketIO = require('socket.io');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Socket.IO 서버 인스턴스 초기화 함수
const initSocketIO = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message1', (data) => {
      console.log('Received from client:', data);
      io.emit('message2', { author: 'Server', message: data });
    });
  });

  return io;
};

app.prepare().then(async () => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = initSocketIO(httpServer);

  server.all('/chat', (req, res) => {
    return handle(req, res);
  });

  const PORT =3000;
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/chat`);
  });
});