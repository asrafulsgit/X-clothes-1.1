import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Connected to Socket.io");
});

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
});

export default socket;