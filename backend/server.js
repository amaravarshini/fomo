const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const { Schema } = mongoose;

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Atlas connection string
const mongoUri = 'mongodb+srv://varu:varu@cluster0.hzue1cn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Replace <username>, <password>, and <dbname> with your MongoDB Atlas credentials and database name
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB Atlas');
});

// Define schema
const dataSchema = new Schema({
    symbol: String,
    price: Number,
    timestamp: { type: Date, default: Date.now }
});

const Data = mongoose.model('Data', dataSchema);

// Fetch and store data from API
const fetchAndStoreData = async () => {
    const symbols = ['bitcoin']; // Example symbols
    symbols.forEach(async (symbol) => {
        try {
            const price = await fetchData(symbol);
            await saveData(symbol, price);
        } catch (error) {
            console.error('Error processing symbol:', symbol, error);
        }
    });
};

// Fetch data from API
const fetchData = async (symbol) => {
    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`;
        const response = await axios.get(url);
        const data = response.data;
        const price = data[symbol].usd;
        return price;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Save data to MongoDB
const saveData = async (symbol, price) => {
    const newData = new Data({ symbol, price });
    await newData.save();
    console.log(`Saved data for ${symbol}: ${price}`);
};

// Start fetching data at intervals
setInterval(fetchAndStoreData, 5000); // Fetch every 10 seconds

// API route to fetch data from MongoDB
app.get('/api/data', async (req, res) => {
    try {
        const data = await Data.find().sort({ timestamp: -1 }).limit(10); // Fetch latest 10 records
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
