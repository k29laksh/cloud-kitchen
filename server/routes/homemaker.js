const express = require('express');
const app = express();

const route = express.Router();

const authenticateJWT = require('../middleware.js');