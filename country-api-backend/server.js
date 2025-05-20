const express = require('express');
const connectDB = require('./db');
const Contact = require('./models/Contact');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Connect to DB and start server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
  });
});

// POST API to receive form data
app.post('/contact', async (req, res) => {
  try {
    const { username, email, message } = req.body;

    const newContact = new Contact({ username, email, message });
    await newContact.save();

    res.status(201).json({ message: "Message saved successfully!" });
  } catch (error) {
    console.error(" Error saving contact:", error);
    res.status(500).json({ message: "Server error" });
  }
});
