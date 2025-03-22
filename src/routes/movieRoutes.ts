import express from 'express';
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } from '../controllers/movieController';
import { adminMiddleware, userMiddleware } from '../middleware/authMiddleware'; 

const movieRouter = express.Router();

movieRouter.get('/warmovies/', getAllMovies);
movieRouter.get('/warmovies/:id', userMiddleware, getMovieById);
movieRouter.post('/warmovies/', adminMiddleware, createMovie);
movieRouter.put('/warmovies/:id', adminMiddleware, updateMovie);
movieRouter.delete('/warmovies/:id', adminMiddleware, deleteMovie);

export default movieRouter;
