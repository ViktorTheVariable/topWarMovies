import WarMovie, { IMovie } from '../models/movieModel';
import { Request, Response } from 'express';

const getAllMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const movies = await WarMovie.find();
        res.json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getMovieById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const movie = await WarMovie.findById(userId);
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        res.json(movie.toObject());
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const newMovie: IMovie = await WarMovie.create({
            title: req.body.title,
            plot: req.body.plot,
            releaseYear: req.body.releaseYear,
            director: req.body.director,
            writers: req.body.writers,
            actors: req.body.actors,
            length: req.body.length,
            warType: req.body.warType,
            imdbRating: {
                userRating: req.body.imdbRating?.userRating,
                expertRating: req.body.imdbRating?.expertRating
            },
            language: req.body.language,
            country: req.body.country,
            media: {
                imageUrl: req.body.media?.imageUrl,
                trailerUrl: req.body.media?.trailerUrl
            }
        });
        res.status(201).json({message: 'Movie created successfully', createdMovie: newMovie});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateMovie = async (req: Request, res: Response): Promise<void>=> {
    try {
        const movieId = req.params.id;
        
        const existingMovie = await WarMovie.findById(movieId);
        if (!existingMovie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        
        const updatedMovie = await WarMovie.findByIdAndUpdate(
            movieId,
            {
                title: req.body.title || existingMovie.title,
                plot: req.body.plot || existingMovie.plot,
                releaseYear: req.body.releaseYear || existingMovie.releaseYear,
                director: req.body.director || existingMovie.director,
                writers: req.body.writers || existingMovie.writers,
                actors: req.body.actors || existingMovie.actors,
                length: req.body.length || existingMovie.length,
                warType: req.body.warType || existingMovie.warType,
                imdbRating: {
                    userRating: req.body.imdbRating?.userRating || existingMovie.imdbRating.userRating,
                    expertRating: req.body.imdbRating?.expertRating || existingMovie.imdbRating.expertRating
                },
                language: req.body.language || existingMovie.language,
                country: req.body.country || existingMovie.country,
                media: {
                    imageUrl: req.body.media?.imageUrl || existingMovie.media.imageUrl,
                    trailerUrl: req.body.media?.trailerUrl || existingMovie.media.trailerUrl
                }
            }, { new: true }
        ) as IMovie & Document;
        
        res.json({message: 'Movie updated successfully', updatedMovie: updatedMovie});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const movieId = req.params.id;
        
        const movie = await WarMovie.findById(movieId);
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        await movie.deleteOne();
        res.json({message: 'Movie deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie
};