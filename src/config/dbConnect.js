const mongoose = require("mongoose");
require('dotenv').config()

const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(
    MONGODB_URL,
    {
        useNewUrlParser: true
    }
);
let db = mongoose.connection
module.exports= db;