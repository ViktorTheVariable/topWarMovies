import express from 'express';
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } from '../controllers/movieController';

const movieRouter = express.Router();

movieRouter.get('/warmovies/', getAllMovies);
movieRouter.get('/warmovies/:id', getMovieById);
movieRouter.post('/warmovies/', createMovie);
movieRouter.put('/warmovies/:id', updateMovie);
movieRouter.delete('/warmovies/:id', deleteMovie);

export default movieRouter;
