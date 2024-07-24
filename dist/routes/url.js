"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shortid_1 = __importDefault(require("shortid"));
const url_1 = __importDefault(require("../models/url"));
const router = express_1.default.Router();
router.post('/shorten', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { originalUrl } = req.body;
    const shortId = shortid_1.default.generate();
    const shortUrl = `${req.protocol}://${req.get('host')}/api/url/${shortId}`;
    const newUrl = new url_1.default({ originalUrl, shortId });
    yield newUrl.save();
    res.json({ shortUrl, shortId });
}));
router.get('/:shortId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortId } = req.params;
    const url = yield url_1.default.findOne({ shortId });
    if (url) {
        res.redirect(url.originalUrl);
    }
    else {
        res.status(404).json({ error: 'URL not found' });
    }
}));
exports.default = router;
