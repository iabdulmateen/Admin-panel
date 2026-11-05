
import { io } from "socket.io-client";

const socket = io(
  "https://e-commerce-backend-blush-mu.vercel.app",
  {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
  }
);

socket.on("connect", () => {
  console.log("SOCKET CONNECTED:", socket.id);
  socket.emit("join-admin");
});

socket.on("new-order", (order) => {
  console.log("SOCKET EVENT RECEIVED:", order);
});

socket.on("connect_error", (error) => {
  console.error("SOCKET ERROR:", error.message);
});

socket.on("disconnect", (reason) => {
  console.log("SOCKET DISCONNECTED:", reason);
});

export default socket;
