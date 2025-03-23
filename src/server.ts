import express from 'express';
import { Express, Request, Response } from 'express';
import movieRouter from './routes/movieRoutes';
import userRouter from './routes/userRoutes';
import dotenv from 'dotenv';
import connectDB from './db';
import cors from 'cors';

dotenv.config();

connectDB();

const app: Express = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const port: string | number = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', userRouter, movieRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hej Världen!');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`); 
})