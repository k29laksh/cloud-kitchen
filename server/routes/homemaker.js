// homemaker routes
const express = require('express');
const Homemaker = require("../models/Homemaker.js");
const FoodItem = require("../models/FoodItem.js"); // Import FoodItem model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateJWT, refreshJWTToken } = require('../routes/jwtFunc.js');
const router = express.Router();
const { authenticateHomemakerJWT } = require('../middleware.js');
const { storage } = require('../cloudconfig.js');
const multer = require('multer');
const upload = multer({ storage });

// Post req Route for homemaker registration
router.post("/register", async(req, res) => {
    const { name, email, password } = req.body;

    const existingHomemaker = await Homemaker.findOne({ email });
    if (existingHomemaker) {
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
    const { kitchenName, IFSC, city, state, pin, phoneNo, veg } = req.body;

    try {
        const id = req.homemakerId;
        const homemaker = await Homemaker.findById(id);

        if (!homemaker) {
            return res.status(404).json({ error: "Homemaker not found" });
        }

        // Update profile fields
        homemaker.kitchenName = kitchenName;
        homemaker.IFSCLicense = IFSC;
        homemaker.city = city;
        homemaker.state = state; // Fixed the capitalization
        homemaker.pin = pin; // Fixed the capitalization
        homemaker.phone = phoneNo;
        homemaker.veg = veg;

        await homemaker.save();

        res.status(200).json({ message: "Profile completed successfully", homemaker });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Route to add kitchen images
router.post('/addKitchenImages', authenticateHomemakerJWT, upload.array('kitchenImage', 10), async(req, res) => {
    const homemakerId = req.homemakerId;

    try {
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

// Route to add food items
router.post('/addFoodItem', authenticateHomemakerJWT, async(req, res) => {
    const { name, price, description } = req.body; // Add necessary fields

    try {
        const homemakerId = req.homemakerId;
        const newFoodItem = new FoodItem({ name, price, description, homemaker: homemakerId });

        const savedFoodItem = await newFoodItem.save();

        // Update the homemaker's foodItems array
        const homemaker = await Homemaker.findById(homemakerId);
        homemaker.foodItems.push(savedFoodItem._id);
        await homemaker.save();

        res.status(201).json({ message: "Food item added successfully", foodItem: savedFoodItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Route to update food items
router.put('/updateFoodItem/:foodItemId', authenticateHomemakerJWT, async(req, res) => {
    const { foodItemId } = req.params;
    const updates = req.body;

    try {
        const foodItem = await FoodItem.findByIdAndUpdate(foodItemId, updates, { new: true });
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }

        res.status(200).json({ message: "Food item updated successfully", foodItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Route to delete food items
router.delete('/deleteFoodItem/:foodItemId', authenticateHomemakerJWT, async(req, res) => {
    const { foodItemId } = req.params;

    try {
        const foodItem = await FoodItem.findById(foodItemId);
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }

        // Remove food item reference from homemaker
        const homemaker = await Homemaker.findById(foodItem.homemaker);
        homemaker.foodItems = homemaker.foodItems.filter(itemId => itemId.toString() !== foodItemId);
        await homemaker.save();

        // Delete food item
        await FoodItem.findByIdAndDelete(foodItemId);

        res.status(200).json({ message: "Food item deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Route to retrieve all reviews of the homemaker's food items
router.get('/foodItemReviews', authenticateHomemakerJWT, async(req, res) => {
    try {
        const homemakerId = req.homemakerId;
        const homemaker = await Homemaker.findById(homemakerId).populate('foodItems');

        if (!homemaker) {
            return res.status(404).json({ error: "Homemaker not found" });
        }

        const reviews = await Promise.all(homemaker.foodItems.map(async(foodItem) => {
            const populatedItem = await foodItem.populate('reviews');
            return populatedItem.reviews;
        }));

        res.status(200).json({ reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Route to get homemaker by ID, including all details of each food item
router.get('/:id', async(req, res) => {
    const homemakerId = req.params.id;

    try {
        // Find the homemaker by ID and populate all fields in the food items
        const homemaker = await Homemaker.findById(homemakerId)
            .populate('foodItems'); // Populate all fields of each food item

        if (!homemaker) {
            return res.status(404).json({ error: "Homemaker not found" });
        }

        // Respond with homemaker details and complete food items
        res.status(200).json({
            homemaker: {
                id: homemaker._id,
                name: homemaker.name,
                email: homemaker.email,
                kitchenName: homemaker.kitchenName,
                city: homemaker.city,
                state: homemaker.state,
                pin: homemaker.pin,
                phone: homemaker.phone,
                veg: homemaker.veg,
                kitchenImage: homemaker.kitchenImage,
                foodItems: homemaker.foodItems // Contains all details of each food item
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;