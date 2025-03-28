import express from 'express';
import { Express, Request, Response } from 'express';
import movieRouter from './routes/movieRoutes';
import userRouter from './routes/userRoutes';
import dotenv from 'dotenv';
import connectDB from './db';
import corsMiddleware from './middleware/corsMiddleware';

dotenv.config();

connectDB();

const app: Express = express();

const port: string | number = process.env.PORT || 3000;

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', userRouter, movieRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('My Top War Movies API');
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`); 
})