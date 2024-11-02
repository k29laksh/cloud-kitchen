require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Homemaker = require("./models/Homemaker");
const Kitchen = require('./models/Kitchen.js');
const Customer = require("./models/Customer.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }));
  

MONGO_URL = "mongodb://127.0.0.1:27017/kitchenConn";
app.use(express.json());
mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// middleware for creating kitchen only after login/registering
const authenticateJWT = require("./middleware.js");

// Token generation function
const generateJWT = (homemakerId) => {
    return jwt.sign({ id: homemakerId }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

// Refresh token generation function
const refreshJWTToken = (homemakerId) => {
    return jwt.sign({ id: homemakerId }, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });
};

// Post req Route for homemaker register
app.post("/homemakerRegister", async(req, res) => {
    const { name, phone, email, city, State, Pin, password } = req.body;

    const homemaker = await Homemaker.findOne({ email });
    if (homemaker) {
        return res.status(400).json({ error: "Homemaker already exists with this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newHomemaker = new Homemaker({
        name,
        phone,
        email,
        city,
        State,
        Pin,
        password: hashedPassword
    });

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

// Post req Route for homemaker login
app.post("/homemakerLogin", async(req, res) => {
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
                phone: homemaker.phone,
                email: homemaker.email,
                city: homemaker.city,
                State: homemaker.State,
                Pin: homemaker.Pin
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Post req Route for creating kitchen
app.post("/createKitchen", authenticateJWT, async(req, res) => {
    const { kitchenName, description, cuisine, IFSCLicense, kitchenImage } = req.body;

    try {
        const newKitchen = new Kitchen({
            kitchenName,
            description,
            cuisine,
            IFSCLicense,
            kitchenImage,
            homemaker: req.homemakerID
        });

        const savedKitchen = await newKitchen.save();
        res.status(201).json({ savedKitchen });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error creating kitchen" });
    }
});

// Post req route CustomerRegister
app.post("/customerRegister", async(req, res) => {
    const { name, email,password } = req.body;

    const customer = await Customer.findOne({ email: email });

    if (customer) res.status(401).json({ message: "Customer with email address exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newCustomer = new Customer({
        name,
        email,
        password: hashedPassword
    });

    try {
        const savedCustomer = await newCustomer.save();

        const token = generateJWT(savedCustomer._id);
        const refreshToken = refreshJWTToken(savedCustomer._id);

        savedCustomer.refreshToken = refreshToken;
        await savedCustomer.save({ validateBeforeSave: false });

        res.status(200).json({ token, refreshToken, customer: savedCustomer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Post req route customerLogin
app.post("/customerLogin", async(req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(400).json({ error: "Customer not found" });
        }

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const jwt_token = jwt.sign({ id: customer._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            token: jwt_token,
            customer: {
                name: customer.name,
                phone: customer.phone,
                email: customer.email,
                city: customer.city,
                state: customer.state,
                pin: customer.pin
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

app.get("/", (req, res) => {
    res.send("Hii, login page");
});

app.listen(8000, () => {
    console.log("App is listening to port 3000");
});