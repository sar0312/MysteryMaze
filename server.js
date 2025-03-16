const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mysterymaze')
.then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define Schema
const TeamSchema = new mongoose.Schema({
    teamName: { type: String, required: true, unique: true },
    score: { type: Number, default: 0 }
});

const Team = mongoose.model('Team', TeamSchema);

// Route to update score
app.post('/update-score', async (req, res) => {
    const { teamName, points } = req.body;

    if (!teamName || typeof points !== 'number') {
        return res.status(400).json({ error: 'Invalid data' });
    }

    try {
        let team = await Team.findOne({ teamName });

        if (!team) {
            team = new Team({ teamName, score: points });
        } else {
            team.score += points;
        }

        await team.save();
        res.json({ message: 'Score updated', team });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
