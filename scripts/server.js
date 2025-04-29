// server.js
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const API_TOKEN = '9b2c1617f9f24be6b2a6cdce23371bc6'; // ⚡ Replace this with your real token

// Serve static files (your public folder)
app.use(express.static(path.join(__dirname, 'public')));

// Proxy route to fetch league standings
app.get('/api/:leagueCode', async (req, res) => {
    const { leagueCode } = req.params;
    const url = `https://api.football-data.org/v4/competitions/${leagueCode}/standings`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-Auth-Token': API_TOKEN
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching from football-data.org:', error);
        res.status(500).json({ error: 'Failed to fetch league data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
