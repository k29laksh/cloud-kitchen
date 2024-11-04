const jwt = require('jsonwebtoken');

// Middleware for authenticating homemakers
const authenticateHomemakerJWT = function(req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: "Access denied, token missing!" });
    }

    const token = authHeader.split(' ')[1]; // Now token is defined here

    if (!token) {
        return res.status(401).json({ message: "Access denied, token mismatch!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.homemakerId = decoded.id; // Ensure that `id` is a key in your payload
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

// Middleware for authenticating customers
const authenticateCustomerJWT = function(req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: "Access denied, token missing!" });
    }

    const token = authHeader.split(' ')[1]; // Now token is defined here

    if (!token) {
        return res.status(401).json({ message: "Access denied, token mismatch!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.customerId = decoded.id; // Ensure that `id` is a key in your payload for customers
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = {
    authenticateHomemakerJWT,
    authenticateCustomerJWT
};