
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000', {
  transports: ['polling'],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});

socket.on('connect', () => {
  socket.on('new-order', (order) => {
  console.log('SOCKET EVENT RECEIVED:', order);
});
  console.log('SOCKET CONNECTED:', socket.id);
  socket.emit('join-admin');
});

socket.on('connect_error', (error) => {
  console.error('SOCKET ERROR:', error.message);
});

socket.on('disconnect', (reason) => {
  console.log('SOCKET DISCONNECTED:', reason);
});

export default socket;
