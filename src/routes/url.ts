import express from 'express';
import shortid from 'shortid';
import Url from '../models/url';

const router = express.Router();

router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;

    const shortId = shortid.generate();
    const shortUrl = `${req.protocol}://${req.get('host')}/api/url/${shortId}`;

    const newUrl = new Url({ originalUrl, shortId });
    await newUrl.save();

    res.json({ shortUrl, shortId });
});

router.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;

    const url = await Url.findOne({ shortId });
    if (url) {
        res.redirect(url.originalUrl);
    } else {
        res.status(404).json({ error: 'URL not found' });
    }
});

export default router;
