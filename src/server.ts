import express from 'express';
import { Express, Request, Response } from 'express';
import movieRouter from './routes/movieRoutes';
import userRouter from './routes/userRoutes';
import dotenv from 'dotenv';
import connectDB from './db';
dotenv.config();

/* 
mongosh "mongodb+srv://clustertest.zd7tc.mongodb.net/" --apiVersion 1 --username <db_username>
use top_war_movies
db.users.insertOne({
  username: "admin",
  password: "dittStarkaLösenord",
  isAdmin: true,
  createdAt: new Date()
})
*/

connectDB();

const app: Express = express();
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