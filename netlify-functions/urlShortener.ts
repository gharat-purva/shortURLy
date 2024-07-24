import { Handler } from '@netlify/functions';
import shortid from 'shortid';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');

const dbName = 'url-shortener';
const collectionName = 'urls';

const handler: Handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            const { originalUrl } = JSON.parse(event.body || '{}');
            if (!originalUrl) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Invalid URL' }),
                };
            }

            const shortUrl = shortid.generate();
            await collection.insertOne({
                originalUrl,
                shortUrl,
            });

            return {
                statusCode: 200,
                body: JSON.stringify({ shortUrl }),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: error.message }),
            };
        } finally {
            await client.close();
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
};

export { handler };
