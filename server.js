require('livedebugger').initializeLiveDebugger('2f9a1b7d4e6053c7f9c2d0e3b68415a7');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

const EXTERNAL_API_URL = process.env.NODE_ENV === "production" 
    ? "https://buggyapi.onrender.com/balance" 
    : "http://localhost:3000/balance";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Get balance and transactions
app.get('/api/balance', async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    try {
        const response = await axios.get(`${EXTERNAL_API_URL}/${userId}`);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching balance:", error);
        res.status(error.response?.status || 500).json({
            error: error.response?.data?.error || 'Failed to fetch balance'
        });
    }
});

// Process transaction
app.post('/api/balance', async (req, res) => {
    const { userId, amount } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    if (amount === undefined || amount === null) {
        return res.status(400).json({ error: 'amount is required' });
    }

    if (typeof amount !== 'number') {
        return res.status(400).json({ error: 'amount must be a number' });
    }

    try {
        const response = await axios.post(`${EXTERNAL_API_URL}`, { amount, userId });
        res.json(response.data);
    } catch (error) {
        console.error("Error processing transaction:", error);
        res.status(error.response?.status || 500).json({
            error: error.response?.data?.error || 'Failed to process transaction'
        });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 