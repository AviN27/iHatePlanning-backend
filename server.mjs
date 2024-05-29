import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import plansRouter from './routes/plans.mjs';
import cors from 'cors';

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to Database"))

app.use(express.json())

app.use('/plans', plansRouter)

app.listen(3002, () => console.log('Server Started'))

export default app;