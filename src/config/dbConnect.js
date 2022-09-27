import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL)
let db = mongoose.connection
export default db