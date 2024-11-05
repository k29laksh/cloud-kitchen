require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customer.js');
const homemakerRoutes = require('./routes/homemaker.js');
const foodItemRoutes = require('./routes/foodItem');
const reviewRoutes = require('./routes/review.js');
const cartRoutes = require('./routes/cart.js');

// Mong DB work
MONGO_URL = "mongodb://127.0.0.1:27017/kitchenConn";
app.use(express.json());
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));

// Homemaker routing
app.use("/homemaker", homemakerRoutes)

// Customer routing 
app.use("/customer", customerRoutes);

// foodItems routing
app.use("/foodItems", foodItemRoutes);

// Review routing
app.use("/review", reviewRoutes);

// Cart routing
app.use("/cart", cartRoutes);

// Index route
app.get("/", (req, res) => {
    res.send("Hii, login page");
});

app.listen(3000, () => {
    console.log("App is listening to port 3000");
});