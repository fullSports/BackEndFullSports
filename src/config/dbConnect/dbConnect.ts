import mongoose from "mongoose";
require('dotenv').config()

const MONGODB_URL = process.env.MONGODB_URL as string;
mongoose.connect(MONGODB_URL);
let db = mongoose.connection
export default db;