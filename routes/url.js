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
const express_1 = require("express");
const shortid_1 = __importDefault(require("shortid"));
const url_1 = __importDefault(require("../../models/url"));
const router = (0, express_1.Router)();
router.post('/shorten', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { originalUrl } = req.body;
    const shortUrl = shortid_1.default.generate();
    const url = new url_1.default({ originalUrl, shortUrl });
    yield url.save();
    res.json({ originalUrl, shortUrl });
}));
router.get('/:shortUrl', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortUrl } = req.params;
    const url = yield url_1.default.findOne({ shortUrl });
    if (url) {
        return res.redirect(url.originalUrl);
    }
    else {
        return res.status(404).json('URL not found');
    }
}));
exports.default = router;
