"use strict";
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const urlRoutes = require('./routes/url');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/url', urlRoutes);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve index.html as the root file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/url-shortener';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(error.message);
    });
