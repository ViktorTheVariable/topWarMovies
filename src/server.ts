import express from 'express';
import { Express, Request, Response } from 'express';
import movieRouter from './routes/movieRoutes';
import userRouter from './routes/userRoutes';
import dotenv from 'dotenv';
import connectDB from './db';
dotenv.config();

connectDB();

const app: Express = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', userRouter, movieRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hej Världen!');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`); 
})