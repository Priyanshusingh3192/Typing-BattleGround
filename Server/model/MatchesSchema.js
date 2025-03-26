const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchesSchema = new Schema({
    userEmail: {
        type: String, // Email of the user
        required: true,
        unique: true // Ensures one document per user
    },
    matches: [
        {
            opponentEmail: {
                type: String, // Email of the opponent
                required: true
            },
            winnerEmail: {
                type: String, // Email of the winner
                required: true
            },
            date: {
                type: Date, // Date of the match
                default: Date.now
            }
        }
    ]
});

module.exports = mongoose.model('Match', MatchesSchema);
