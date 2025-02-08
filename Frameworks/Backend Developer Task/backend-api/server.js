const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const { verifyToken } = require('./middleware/authMiddleware');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
console.log(process.env.MONGO_URI)
console.log("Mongo URI:", process.env.MONGO_URI);

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

  app.use(express.json()); // ✅ Allows JSON request bodies
// Use routes
app.use('/api', authRoutes); // Authentication routes
// app.use('/api', categoryRoutes); // Category management routes
app.use("/api/categories", categoryRoutes);
app.use("/api", subCategoryRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// const categoryRoutes = require("./routes/categoryRoutes");

// Middleware

// ✅ Ensure this is present
