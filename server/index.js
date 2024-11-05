require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customer.js');
const homemakerRoutes = require('./routes/homemaker.js');
const foodItemRoutes = require('./routes/foodItem');
const reviewRoutes = require('./routes/review.js');



// Mong DB work
app.use(express.json());
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));

// Homemaker routes
app.use("/homemaker", homemakerRoutes)

// Customer routing 
app.use("/customer", customerRoutes);

// foodItems routing
app.use("/foodItems", foodItemRoutes);

// Review routes
app.use("/review", reviewRoutes);

// Index route
app.get("/", (req, res) => {
    res.send("Hii, login page");
});

app.listen(5000, () => {
    console.log("App is listening to port 5000");
});