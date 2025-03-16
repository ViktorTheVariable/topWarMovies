import express from 'express';
import movieRouter from './routes/movieRoutes';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/v1/warmovies', movieRouter);

app.get('/', (req: any, res: any) => {
    res.send('Hej Världen!');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`); 
})