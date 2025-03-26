const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchesSchema = new Schema({
    userEmail: {
        type: String, // Email of the user
        required: true,
        unique: true // Ensures one document per user
    },
    wins: {
        type: Number, // Count of wins
        default: 0, // Default value is 0
        required: true
    },
    losses: {
        type: Number, // Count of losses
        default: 0, // Default value is 0
        required: true
    }
});

module.exports = mongoose.model('Match', MatchesSchema);
