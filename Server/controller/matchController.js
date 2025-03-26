const Match = require('../model/MatchesSchema');

// Function to store match data
const storeData = async (req, res) => {
    const { winner, loser } = req.body;

    if (!winner || !loser || winner.length === 0 || loser.length === 0) {
        return res.status(400).json({ error: 'Winner and loser data are required.' });
    }

    const loserEmail = loser[loser.length - 1]; // Get the last loser email
    const winnerEmail = winner[0]; // Get the first winner email

    try {
        // Process the winner
        for (const winEmail of winner) {
            // Find or create the match record for the winner
            let winnerRecord = await Match.findOne({ userEmail: winEmail });

            if (!winnerRecord) {
                winnerRecord = new Match({ userEmail: winEmail, matches: [] });
            }

            // Add the match for the winner
            winnerRecord.matches.push({
                opponentEmail: loserEmail,
                winnerEmail: winEmail,
            });

            await winnerRecord.save();
        }

        // Process the loser
        for (const loseEmail of loser) {
            // Find or create the match record for the loser
            let loserRecord = await Match.findOne({ userEmail: loseEmail });

            if (!loserRecord) {
                loserRecord = new Match({ userEmail: loseEmail, matches: [] });
            }

            // Add the match for the loser
            loserRecord.matches.push({
                opponentEmail: winnerEmail,
                winnerEmail: winnerEmail,
            });

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

        res.status(200).json({ matches: matchRecord.matches });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve match data', details: error.message });
    }
};

module.exports = { storeData, getData };
