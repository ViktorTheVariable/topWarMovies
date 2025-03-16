import express from 'express';
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } from '../controllers/movieController';

const movieRouter = express.Router();

movieRouter.get('/', getAllMovies);
movieRouter.get('/:id', getMovieById);
movieRouter.post('/', createMovie);
movieRouter.put('/:id', updateMovie);
movieRouter.delete('/:id', deleteMovie);

export default movieRouter;
