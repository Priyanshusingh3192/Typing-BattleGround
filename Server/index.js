const express = require('express');
const http = require('http'); // For creating a server
const { Server } = require('socket.io'); // For Socket.IO
const app = express();

const PORT = 8000;
const cookieParser = require("cookie-parser");
const corsOption = require("./config/corsOptions");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const socketApi = require('./socketApi'); // Import Socket.IO logic

connectDB();

// Once connected to MongoDB
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware setup
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

// Define routes
app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Create an HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Your frontend URL
    methods: ["GET", "POST"]
  }
});

// Use the socket logic
socketApi(io);

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
