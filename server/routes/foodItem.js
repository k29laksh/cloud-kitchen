const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');
const { authenticateHomemakerJWT } = require('../middleware.js');
const Homemaker = require('../models/Homemaker.js');
// Create a new food item
router.post('/', authenticateHomemakerJWT, async(req, res) => {
    const { name, description, ingredients, timeToDeliver, images, price } = req.body;
    const homemakerId = req.homemakerId;

    try {
        const newFoodItem = new FoodItem({
            name,
            description,
            ingredients,
            timeToDeliver,
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
// get all food items

router.get('/', async(req, res) => {

    try {
        const foodItems = await FoodItem.find({});
        if (!foodItems) return res.status(404).json({ error: 'Food items not found' });
        res.status(200).json({ foodItems });
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