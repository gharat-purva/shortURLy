import mongoose, { Schema } from 'mongoose';

interface IUrl {
    originalUrl: string;
    shortId: string;
}

const urlSchema = new Schema<IUrl>({
    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true }
});

const Url = mongoose.model<IUrl>('Url', urlSchema);

export default Url;
