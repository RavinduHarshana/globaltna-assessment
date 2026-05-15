import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const mongoURI = process.env.MONGO_URI as string;

mongoose.connect(mongoURI)
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas successfully');
        app.listen(port, () => {
            console.log(`🚀 Server is running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('❌ Error connecting to MongoDB:', error);
    });


app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
