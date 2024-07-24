import { Router } from 'express';
import shortid from 'shortid';
import Url from '../models/url';

const router = Router();

router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();

  const url = new Url({ originalUrl, shortUrl });
  await url.save();

  res.json({ originalUrl, shortUrl });
});

router.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  const url = await Url.findOne({ shortUrl });

  if (url) {
    return res.redirect(url.originalUrl);
  } else {
    return res.status(404).json('URL not found');
  }
});

export default router;
