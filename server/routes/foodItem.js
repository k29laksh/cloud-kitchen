const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');
const { authenticateHomemakerJWT } = require('../middleware.js');
const Homemaker = require('../models/Homemaker.js');
const { storage } = require('../cloudconfig.js');
const multer = require('multer');
const upload = multer({ storage });

// Create a new food item
router.post('/', authenticateHomemakerJWT, upload.array('foodImage', 10), async(req, res) => {
    const { name, description, ingredients, timeToDeliver, veg, price } = req.body;
    const homemakerId = req.homemakerId;

    try {
        // Extract paths of uploaded images from req.files
        const images = req.files ? req.files.map(file => file.path) : [];

        // Create a new food item with uploaded images and other details
        const newFoodItem = new FoodItem({
            name,
            description,
            ingredients,
            timeToDeliver,
            veg,
            images,
            price,
            homemaker: homemakerId
        });

        await newFoodItem.save();

        // Find the homemaker and add the food item ID to their foodItems array
        const homemaker = await Homemaker.findById(homemakerId);
        if (homemaker) {
            homemaker.foodItems.push(newFoodItem._id);
            await homemaker.save();
        }

        res.status(201).json({ message: 'Food item created successfully', newFoodItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get all food items from all homemakers
// Public route to get all food items
router.get('/all', async(req, res) => {
    try {
        const foodItems = await FoodItem.find().populate('homemaker'); // Optionally populate homemaker details
        res.status(200).json(foodItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve food items' });
    }
});

// Get a food item by ID
router.get('/:foodItemId', authenticateHomemakerJWT, async(req, res) => {
    const { foodItemId } = req.params;

    try {
        const foodItem = await FoodItem.findById(foodItemId);
        if (!foodItem) return res.status(404).json({ error: 'Food item not found' });
        res.status(200).json({ foodItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update an existing food item
router.put('/:foodItemId', authenticateHomemakerJWT, async(req, res) => {
    const { foodItemId } = req.params;
    const updates = req.body;

    try {
        const updatedFoodItem = await FoodItem.findByIdAndUpdate(foodItemId, updates, { new: true });
        if (!updatedFoodItem) return res.status(404).json({ error: 'Food item not found' });
        res.status(200).json({ message: 'Food item updated successfully', updatedFoodItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a food item
router.delete('/:foodItemId', authenticateHomemakerJWT, async(req, res) => {
    const { foodItemId } = req.params;

    try {
        const deletedFoodItem = await FoodItem.findByIdAndDelete(foodItemId);
        if (!deletedFoodItem) return res.status(404).json({ error: 'Food item not found' });
        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all food items created by the homemaker
router.get('/', authenticateHomemakerJWT, async(req, res) => {
    const homemakerId = req.homemakerId;

    try {
        // Populate the foodItems array to get the actual food item documents
        const homemaker = await Homemaker.findById(homemakerId).populate('foodItems');

        if (!homemaker) {
            return res.status(404).json({ error: 'Homemaker not found' });
        }

        res.status(200).json({ foodItems: homemaker.foodItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


// GET /reviews: Get all reviews for a homemaker's food items
router.get('/reviews', authenticateHomemakerJWT, async(req, res) => {
    const homemakerId = req.homemakerId;

    try {
        // Use the homemaker's ID to find food items and populate the reviews
        const foodItems = await FoodItem.find({ homemaker: homemakerId })
            .populate({
                path: 'reviews',
                populate: { path: 'customer', select: 'name' } // Populate customer details if needed
            });

        // Extract all reviews across food items
        const allReviews = foodItems.flatMap(foodItem => foodItem.reviews);

        res.status(200).json({ reviews: allReviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});



module.exports = router;