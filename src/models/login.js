const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
        },
        isAdmin:{
            type: Boolean,
            default: false
        },
        cliente:{
            type: mongoose.Schema.Types.ObjectId,ref: 'clientes',
        }
    }
);
const login = mongoose.model("login", loginSchema);
module.exports = login;