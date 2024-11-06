const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const { authenticateCustomerJWT } = require('../middleware.js');

// Get the cart for the authenticated customer
router.get('/', authenticateCustomerJWT, async(req, res) => {
    const customerId = req.customerId;

    try {
        const customer = await Customer.findById(customerId).select('cart');
        if (!customer) return res.status(404).json({ error: 'Customer not found' });

        res.status(200).json(customer.cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add an item to the cart
router.post('/add', authenticateCustomerJWT, async(req, res) => {
    const customerId = req.customerId;
    const { foodItem, homemaker, quantity, price } = req.body;

    try {
        const customer = await Customer.findById(customerId);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });

        const existingItem = customer.cart.items.find(item => item.foodItem.toString() === foodItem);

        if (existingItem) {
            existingItem.quantity += quantity; // Increase quantity
        } else {
            customer.cart.items.push({ foodItem, homemaker, quantity, price });
        }

        // Update total price
        customer.cart.totalPrice = customer.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        await customer.save();
        res.status(201).json({ message: 'Item added to cart successfully', cart: customer.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update an item in the cart
router.put('/:foodItemId', authenticateCustomerJWT, async(req, res) => {
    const customerId = req.customerId;
    const { foodItemId } = req.params;
    const { quantity } = req.body;

    try {
        const customer = await Customer.findById(customerId);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });

        const item = customer.cart.items.find(item => item.foodItem.toString() === foodItemId);
        if (!item) return res.status(404).json({ error: 'Item not found in cart' });

        item.quantity = quantity;

        // Update total price
        customer.cart.totalPrice = customer.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        await customer.save();
        res.status(200).json({ message: 'Cart updated successfully', cart: customer.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Remove an item from the cart
// Remove an item from the cart
router.delete('/:foodItemId', authenticateCustomerJWT, async(req, res) => {
    const customerId = req.customerId;
    const { foodItemId } = req.params;

    try {
        const customer = await Customer.findById(customerId);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });

        // Log the current items in the cart for debugging
        console.log('Current items in cart before removal:', customer.cart.items);

        // Filter out the item with the given foodItemId
        const initialItemCount = customer.cart.items.length;
        customer.cart.items = customer.cart.items.filter(item => item.foodItem.toString() !== foodItemId);

        // Check if any items were removed
        if (customer.cart.items.length === initialItemCount) {
            return res.status(404).json({ error: 'Food item not found in cart' });
        }

        // Update total price
        customer.cart.totalPrice = customer.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        await customer.save();
        res.status(200).json({ message: 'Item removed from cart successfully', cart: customer.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;