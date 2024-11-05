const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage
});
module.exports = { upload };