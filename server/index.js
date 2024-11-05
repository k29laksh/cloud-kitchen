require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customer.js');
const homemakerRoutes = require('./routes/homemaker.js');
const foodItemRoutes = require('./routes/foodItem');
const reviewRoutes = require('./routes/review.js');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Middleware
app.use(cors()); // Allow CORS
app.use(express.json({ limit: "50mb" })); // Increase JSON body size limit to 50mb
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // Increase URL-encoded body size limit to 50mb
app.use(express.static("public")); // Serve static files
app.use(cookieParser()); // Parse cookies
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// Routes
app.use("/homemaker", homemakerRoutes);
app.use("/customer", customerRoutes);
app.use("/foodItems", foodItemRoutes);
app.use("/review", reviewRoutes);

// Index route
app.get("/", (req, res) => {
    res.send("Hii, login page");
});

// Start the server
app.listen(5000, () => {
    console.log("App is listening on port 5000");
});
