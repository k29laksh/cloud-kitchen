const express = require('express');
const router = express.Router();
const Cart = require('../models/cart'); // Import Cart model
const FoodItem = require('../models/FoodItem'); // Import FoodItem model
const authenticateCustomerJWT = require('../middleware/authenticateCustomerJWT'); // Import JWT middleware

// Add item to cart
router.post('/add', authenticateCustomerJWT, async(req, res) => {
    const { foodItemId, quantity } = req.body;
    const customerId = req.customerId;

    try {
        // Check if food item exists
        const foodItem = await FoodItem.findById(foodItemId);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        // Check if the customer's cart exists
        let cart = await Cart.findOne({ customer: customerId });
        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = new Cart({ customer: customerId, items: [] });
        }

        // Check if the item already exists in the cart
        const existingItem = cart.items.find(item => item.foodItem.toString() === foodItemId);
        if (existingItem) {
            // Update the quantity if the item already exists
            existingItem.quantity += quantity;
        } else {
            // Add the new item to the cart
            cart.items.push({ foodItem: foodItemId, quantity });
        }

        // Save the cart
        await cart.save();
        res.status(201).json({ message: 'Item added to cart successfully', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get customer's cart
router.get('/', authenticateCustomerJWT, async(req, res) => {
    const customerId = req.customerId;

    try {
        const cart = await Cart.findOne({ customer: customerId }).populate('items.foodItem', 'name price');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update item quantity
router.put('/update/:itemId', authenticateCustomerJWT, async(req, res) => {
    const { quantity } = req.body;
    const customerId = req.customerId;
    const { itemId } = req.params;

    try {
        const cart = await Cart.findOne({ customer: customerId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the item in the cart
        const item = cart.items.find(item => item._id.toString() === itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Update the quantity
        item.quantity = quantity;

        // Save the cart
        await cart.save();
        res.status(200).json({ message: 'Item quantity updated successfully', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Remove item from cart
router.delete('/remove/:itemId', authenticateCustomerJWT, async(req, res) => {
    const customerId = req.customerId;
    const { itemId } = req.params;

    try {
        const cart = await Cart.findOne({ customer: customerId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the item from the cart
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);

        // Save the cart
        await cart.save();
        res.status(200).json({ message: 'Item removed from cart successfully', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;