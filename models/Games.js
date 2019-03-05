const mongoose = require('mongoose');

const Games = new mongoose.Schema({
    userID: {type: String, index: true, unique: true},
    gameID: Number,
    grid: [String],
    winner: String,
});

module.exports = mongoose.model('Games', Games);