import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import urlRoutes from './routes/url';

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

const mongoURI = 'mongodb://localhost:27017/url-shortener';
mongoose.connect(mongoURI).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error(error.message);
});
