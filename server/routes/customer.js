const express = require('express');
const Customer = require('../models/Customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateJWT, refreshJWTToken } = require('../routes/jwtFunc.js');
const router = express.Router();
const { authenticateCustomerJWT } = require('../middleware.js');
const Review = require('../models/Review.js');

// Register customer path
router.post("/register", async(req, res) => {
    const { name, email, password } = req.body;

    const customer = await Customer.findOne({ email: email });

    if (customer) res.status(401).json({ message: "Customer with email address exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newCustomer = new Customer({
        name,
        email,
        password: hashedPassword
    });

    try {
        const savedCustomer = await newCustomer.save();

        const token = generateJWT(savedCustomer._id);
        const refreshToken = refreshJWTToken(savedCustomer._id);

        savedCustomer.refreshToken = refreshToken;
        await savedCustomer.save({ validateBeforeSave: false });

        res.status(200).json({ token, refreshToken, customer: savedCustomer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Complete profile route
router.post("/completeProfile", authenticateCustomerJWT, async(req, res) => {
    const { phone, city, state, pin } = req.body; // Get fields from request body

    try {
        // Find the customer using the ID stored in req.homemakerId (from the middleware)
        const customer = await Customer.findById(req.customerId); // Ensure this matches the payload in your JWT

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // Update the customer's fields
        customer.phone = phone || customer.phone; // Only update if a value is provided
        customer.city = city || customer.city;
        customer.state = state || customer.state;
        customer.pin = pin || customer.pin;

        await customer.save(); // Save the updated customer

        res.status(200).json({ message: "Profile completed successfully", customer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


// Post req route customerLogin
router.post("/login", async(req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(400).json({ error: "Customer not found" });
        }

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const jwt_token = jwt.sign({ id: customer._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            token: jwt_token,
            customer: {
                name: customer.name,
                phone: customer.phone,
                email: customer.email,
                city: customer.city,
                state: customer.state,
                pin: customer.pin
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get all reviews by a specific customer
router.get('/:customerId/reviews', async(req, res) => {
    const { customerId } = req.params;

    try {
        const reviews = await Review.find({ customer: customerId }).populate('foodItem', 'name');
        res.status(200).json({ reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;