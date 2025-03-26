const Match = require('../model/MatchesSchema');

// Function to store match data
const storeData = async (req, res) => {
    const { winner, loser } = req.body;

    if (!winner || !loser || winner.length === 0 || loser.length === 0) {
        return res.status(400).json({ error: 'Winner and loser data are required.' });
    }

    try {
        // Process the winners
        for (const winEmail of winner) {
            // Find or create the match record for the winner
            let winnerRecord = await Match.findOne({ userEmail: winEmail });

            if (!winnerRecord) {
                // Create a new record if it doesn't exist
                winnerRecord = new Match({ userEmail: winEmail, wins: 0, losses: 0 });
            }

            // Increment the wins count
            winnerRecord.wins += 1;

            await winnerRecord.save();
        }

        // Process the losers
        for (const loseEmail of loser) {
            // Find or create the match record for the loser
            let loserRecord = await Match.findOne({ userEmail: loseEmail });

            if (!loserRecord) {
                // Create a new record if it doesn't exist
                loserRecord = new Match({ userEmail: loseEmail, wins: 0, losses: 0 });
            }

            // Increment the losses count
            loserRecord.losses += 1;

            await loserRecord.save();
        }

        res.status(200).json({ message: 'Match data saved successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save match data', details: error.message });
    }
};

// Function to retrieve match data for a user
const getData = async (req, res) => {
    const { userEmail } = req.body;

    if (!userEmail) {
        return res.status(400).json({ error: 'User email is required.' });
    }

    try {
        const matchRecord = await Match.findOne({ userEmail });

        if (!matchRecord) {
            return res.status(404).json({ message: 'No match data found for this user.' });
        }

        res.status(200).json({ wins: matchRecord.wins, losses: matchRecord.losses });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve match data', details: error.message });
    }
};

module.exports = { storeData, getData };
