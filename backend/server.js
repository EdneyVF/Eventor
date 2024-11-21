require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventsRoutes");
const userRoutes = require("./routes/userRoutes");

connectDB();
const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use('/api/users', userRoutes);

app.get(`/`, (req, res) => {
  res.json({ test: ["gato", "cachorro", "peixe", "passarinho"] });
})

app.listen(port , () => {
  console.log(`Listening on port ${port}`);
})