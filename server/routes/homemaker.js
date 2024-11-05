// homemaker routes
const express = require('express');
const Homemaker = require("../models/Homemaker.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateJWT, refreshJWTToken } = require('../routes/jwtFunc.js');
const router = express.Router();
const { authenticateHomemakerJWT } = require('../middleware.js');
const { storage } = require('../cloudconfig.js');
const multer = require('multer');
const upload = multer({ storage });

// Post req Route for homemaker register
router.post("/register", async(req, res) => {
    const { name, email, password } = req.body;

    const homemaker = await Homemaker.findOne({ email });
    if (homemaker) {
        return res.status(400).json({ error: "Homemaker already exists with this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newHomemaker = new Homemaker({ name, email, password: hashedPassword });

    try {
        const savedHomemaker = await newHomemaker.save();

        const token = generateJWT(savedHomemaker._id);
        const refreshToken = refreshJWTToken(savedHomemaker._id);

        savedHomemaker.refreshToken = refreshToken;
        await savedHomemaker.save({ validateBeforeSave: false });

        res.status(201).json({ token, refreshToken, homemaker: savedHomemaker });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

// Post to complete profile
router.post("/completeProfile", authenticateHomemakerJWT, async(req, res) => {
    const { kitchenName, IFSC, city, state, pin, phoneNo, veg, nonVeg } = req.body;

    try {
        const id = req.homemakerId;
        const homemaker = await Homemaker.findOne({ _id: id });

        if (!homemaker) {
            return res.status(404).json({ error: "Homemaker not found" });
        }

        // Update profile fields
        homemaker.kitchenName = kitchenName;
        homemaker.IFSCLicense = IFSC;
        homemaker.city = city;
        homemaker.State = state;
        homemaker.Pin = pin;
        homemaker.phone = phoneNo;
        homemaker.veg = veg;
        homemaker.nonVeg = nonVeg;

        await homemaker.save();

        res.status(200).json({ message: "Profile completed successfully", homemaker });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Route to add kitchen images
router.post('/addKitchenImages', authenticateHomemakerJWT, upload.array('kitchenImage', 10), async(req, res) => {
    const homemakerId = req.homemakerId; // Get homemaker ID from JWT

    try {
        // Find the homemaker and update the kitchenImage array
        const homemaker = await Homemaker.findById(homemakerId);

        if (!homemaker) {
            return res.status(404).json({ error: 'Homemaker not found' });
        }

        const uploadedImages = req.files.map(file => file.path);
        homemaker.kitchenImage = [...new Set([...homemaker.kitchenImage, ...uploadedImages])];


        await homemaker.save();

        res.status(200).json({ message: 'Kitchen images added successfully', kitchenImage: homemaker.kitchenImage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Post req Route for homemaker login
router.post("/login", async(req, res) => {
    const { email, password } = req.body;

    try {
        const homemaker = await Homemaker.findOne({ email });

        if (!homemaker) return res.status(400).json({ message: "Homemaker not found" });

        const isMatch = await bcrypt.compare(password, homemaker.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const token = generateJWT(homemaker._id);
        const refreshToken = refreshJWTToken(homemaker._id);

        homemaker.refreshToken = refreshToken;
        await homemaker.save({ validateBeforeSave: false });

        res.status(200).json({
            token,
            refreshToken,
            homemaker: {
                name: homemaker.name,
                email: homemaker.email,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// route to retrieve all reviews of the homemaker food items
module.exports = router;