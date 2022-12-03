import mongoose from "mongoose";

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
            default: false
        },
        cliente:{
            type: mongoose.Schema.Types.ObjectId,ref: 'clientes',
        }
    }
);
export const login = mongoose.model("login", loginSchema);