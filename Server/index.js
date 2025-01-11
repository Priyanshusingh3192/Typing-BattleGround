const express = require('express');
const app = express();

const PORT = 8000;

const corsOption = require("./config/corsOptions");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

connectDB();
let server;
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cors(corsOption));
app.use(express.json());
// Define routes

app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});