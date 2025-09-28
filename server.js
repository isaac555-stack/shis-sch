import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import contactRoutes from "./Routes/contact.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Use the contact routes
app.use("/api/contact", contactRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL (Vite default)
    methods: ["GET", "POST"],
  },
});

const users = new Map();
const rooms = new Set(["general", "tech", "staff"]);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.emit("roomList", Array.from(rooms));

  socket.on("join", ({ name }) => {
    users.set(socket.id, { name, room: "general" });
    socket.join("general");
    io.to("general").emit("message", {
      id: Date.now(),
      user: "system",
      text: `${name} joined`,
      at: Date.now(),
      system: true,
    });
    io.emit(
      "onlineUsers",
      [...users.entries()].map(([id, u]) => ({
        id,
        name: u.name,
        room: u.room,
      }))
    );
  });

  socket.on("joinRoom", (room) => {
    const u = users.get(socket.id);
    if (!u) return;
    socket.leave(u.room);
    socket.join(room);
    u.room = room;
    io.emit(
      "onlineUsers",
      [...users.entries()].map(([id, u]) => ({
        id,
        name: u.name,
        room: u.room,
      }))
    );
  });

  socket.on("message", (text) => {
    const u = users.get(socket.id);
    if (!u) return;
    io.to(u.room).emit("message", {
      id: Date.now(),
      user: u.name,
      text,
      at: Date.now(),
    });
  });

  socket.on("disconnect", () => {
    const u = users.get(socket.id);
    if (u) {
      users.delete(socket.id);
      io.emit(
        "onlineUsers",
        [...users.entries()].map(([id, u]) => ({
          id,
          name: u.name,
          room: u.room,
        }))
      );
    }
  });
});

server.listen(3001, () => {
  console.log("✅ Socket.io server running on http://localhost:3001");
});
