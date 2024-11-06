const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');
const { authenticateHomemakerJWT } = require('../middleware.js');
const Homemaker = require('../models/Homemaker.js');
const fs = require('fs');
const path = require('path');

// Utility function to save base64 images as files
const saveBase64Image = (base64Data, fileName) => {
    const base64Image = base64Data.split(';base64,').pop();
    const uploadDir = path.join(__dirname, '../uploads');
    const filePath = path.join(uploadDir, fileName);

    // Ensure the directory exists
    fs.mkdirSync(uploadDir, { recursive: true });

    // Write the file in base64 encoding
    fs.writeFileSync(filePath, base64Image, { encoding: 'base64' });

    // Return the relative path to use as a URL
    return `/uploads/${fileName}`;
};

// Create a new food item
router.post('/', authenticateHomemakerJWT, async(req, res) => {
    const { name, description, ingredients, timeToDeliver, veg, price, foodImages } = req.body;
    const homemakerId = req.homemakerId;

    try {
        // Process and save each base64 image
        const images = foodImages.map((image, index) => {
            const fileName = `food_${Date.now()}_${index}.png`; // Customize filename as needed
            return saveBase64Image(image.fileContent, fileName);
        }).filter(filePath => filePath !== null); // Filter out any nulls from failed saves

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

module.exports = router;


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
router.get('/:foodItemId', async(req, res) => {
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
router.get('/getAll', async(req, res) => {
    try {
        const foodItems = await FoodItem.find({});
        if (!foodItems || foodItems.length === 0) {
            return res.status(404).json({ error: 'No food items found' });
        }
        res.status(200).json(foodItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


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
        // Use the homemaker's ID to find food items and populate the full reviews
        const foodItems = await FoodItem.find({ homemaker: homemakerId })
            .populate({
                path: 'reviews',
                populate: { path: 'customer' } // Populate all customer fields
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