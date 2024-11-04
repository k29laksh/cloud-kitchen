const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const FoodItem = require('../models/FoodItem');
const { authenticateCustomerJWT } = require('../middleware.js');

// Add a review to a food item
router.post('/:foodItemId', authenticateCustomerJWT, async(req, res) => {
    const { foodItemId } = req.params;
    const { rating, comment, foodImage } = req.body;
    const customerId = req.customerId;

    try {
        const review = new Review({
            customer: customerId,
            foodItem: foodItemId,
            rating,
            comment,
            foodImage
        });

        await review.save();

        // Add review reference to the food item
        await FoodItem.findByIdAndUpdate(foodItemId, { $push: { reviews: review._id } });

        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update an existing review
router.put('/:reviewId', authenticateCustomerJWT, async(req, res) => {
    const { reviewId } = req.params;
    const { rating, comment, foodImage } = req.body;
    const customerId = req.customerId;

    try {
        const review = await Review.findOne({ _id: reviewId, customer: customerId });
        if (!review) return res.status(404).json({ error: 'Review not found or not authorized' });

        review.rating = rating || review.rating;
        review.comment = comment || review.comment;
        review.foodImage = foodImage || review.foodImage;

        await review.save();

        res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a review
router.delete('/:reviewId', authenticateCustomerJWT, async(req, res) => {
    const { reviewId } = req.params;
    const customerId = req.customerId;

    try {
        const review = await Review.findOneAndDelete({ _id: reviewId, customer: customerId });
        if (!review) return res.status(404).json({ error: 'Review not found or not authorized' });

        // Remove review reference from the food item
        await FoodItem.findByIdAndUpdate(review.foodItem, { $pull: { reviews: reviewId } });

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a specific review by ID
router.get('/:reviewId', async(req, res) => {
    const { reviewId } = req.params;

    try {
        const review = await Review.findById(reviewId).populate('customer', 'name').populate('foodItem', 'name');
        if (!review) return res.status(404).json({ error: 'Review not found' });

        res.status(200).json({ review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});



module.exports = router;