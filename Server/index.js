const express = require('express');
const app = express();

const PORT = 8000;


const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
connectDB();
let server;
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define routes

app.use("/user", require("./routes/user"));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});