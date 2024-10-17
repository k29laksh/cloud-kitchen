const jwt = require('jsonwebtoken');

const authenticateJWT = function(req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: "Access denied, token missing!" });
    }

    const token = authHeader.split(' ')[1]; // Now token is defined here

    if (!token) {
        return res.status(401).json({ message: "Access denied, token mismatch!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Use JWT_SECRET defined above
        req.homemakerId = decoded.id; // Ensure that `id` is a key in your payload
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = authenticateJWT;