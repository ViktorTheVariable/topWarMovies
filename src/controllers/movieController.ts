import { IMovie, movies } from '../models/movieModel';
import { Request, Response } from 'express';

const getAllMovies = (req: Request, res: Response) => {
    res.json(movies);
};

const getMovieById = (req: Request, res: Response) => {
    const movie = movies.find((m: IMovie) => m.id === parseInt(req.params.id));
    if (!movie) {
        res.status(404).json({ message: 'Movie not found' });
        return;
    }
    res.json(movie);
};

const createMovie = (req: Request, res: Response) => {
    const newMovie: IMovie = {
        id: movies.length + 1,
        title: req.body.title || '',
        plot: req.body.plot || '',
        releaseYear: req.body.releaseYear || 0,
        director: req.body.director || '',
        writers: req.body.writers || [],
        actors: req.body.actors || [],
        length: req.body.length || '',
        warType: req.body.warType || '',
        imdbRating: {
            userRating: req.body.imdbRating?.userRating || 0,
            expertRating: req.body.imdbRating?.expertRating || 0
        },
        language: req.body.language || [],
        country: req.body.country || [],
        media: {
            imageUrl: req.body.media?.imageUrl || '',
            trailerUrl: req.body.media?.trailerUrl || ''
        }
    };
    movies.push(newMovie);
    res.status(201).json({message: 'Movie created successfully', createdMovie: newMovie});
};

const updateMovie = (req: Request, res: Response) => {
    const movieId = parseInt(req.params.id);
    const movieIndex = movies.findIndex((m: IMovie) => m.id === movieId);
    if (movieIndex === -1) {
        res.status(404).json({ message: 'Movie not found' });
        return;
    }
    const updatedMovie: IMovie = {
        ...movies[movieIndex],
        title: req.body.title || movies[movieIndex].title,
        plot: req.body.plot || movies[movieIndex].plot,
        releaseYear: req.body.releaseYear || movies[movieIndex].releaseYear,
        director: req.body.director || movies[movieIndex].director,
        writers: req.body.writers || movies[movieIndex].writers,
        actors: req.body.actors || movies[movieIndex].actors,
        length: req.body.length || movies[movieIndex].length,
        warType: req.body.warType || movies[movieIndex].warType,
        imdbRating: {
            userRating: req.body.imdbRating?.userRating || movies[movieIndex].imdbRating.userRating,
            expertRating: req.body.imdbRating?.expertRating || movies[movieIndex].imdbRating.expertRating
        },
        language: req.body.language || movies[movieIndex].language,
        country: req.body.country || movies[movieIndex].country,
        media: {
            imageUrl: req.body.media?.imageUrl || movies[movieIndex].media.imageUrl,
            trailerUrl: req.body.media?.trailerUrl || movies[movieIndex].media.trailerUrl
        }
    };
    res.json({message: 'Movie updated successfully', updatedMovie: updatedMovie});
};

const deleteMovie = (req: Request, res: Response) => {
    const movieId = parseInt(req.params.id);
    const movieIndex = movies.findIndex((m: IMovie) => m.id === movieId);
    if (movieIndex === -1) {
        res.status(404).json({ message: 'Movie not found' });
        return;
    }
    movies.splice(movieIndex, 1);
    res.json({message: 'Movie deleted successfully'});
};

export {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie
};