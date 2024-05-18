import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    // Assign the socket ID to the user ID
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} is connected with socket ID ${socket.id}`);
  } else {
    console.log(`User ID is undefined for socket ID ${socket.id}`);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("messageSeenByUser", async ({ userToChatId, userId }) => {
    try {
      const conversation = await Conversation.findOne({
        participants: { $all: [userId, userToChatId] },
      });
      if (conversation) {
        await Message.updateMany(
          { conversationId: conversation._id, seen: false },
          { $set: { seen: true } }
        );
        io.to(userSocketMap[userId]).emit("messagesSeen", {
          conversationId: conversation._id,
        });
      }
    } catch (error) {
      console.error("Error in messageSeenByUser event:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);

    // Remove the user from the map
    for (const [id, socketId] of Object.entries(userSocketMap)) {
      if (socketId === socket.id) {
        delete userSocketMap[id];
        console.log(
          `User ${id} with socket ID ${socket.id} removed from userSocketMap`
        );
        break;
      }
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
