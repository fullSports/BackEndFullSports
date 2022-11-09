const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin:{
            type: Boolean,
            required: true,
            default: false
        }
    }
);
const login = mongoose.model("login", loginSchema);
module.exports = login;