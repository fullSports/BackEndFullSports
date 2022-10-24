const mongoose = require('mongoose');

const ImagemSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createAt: {
        type: Date,
        default: Date.now,
    }
});
module.exports = mongoose.model("imagem", ImagemSchema);