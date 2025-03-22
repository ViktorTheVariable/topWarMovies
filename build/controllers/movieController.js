"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.getMovieById = exports.getAllMovies = exports.createMovie = void 0;
const movieModel_1 = __importDefault(require("../models/movieModel"));
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield movieModel_1.default.find();
        res.json(movies);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllMovies = getAllMovies;
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const movie = yield movieModel_1.default.findById(userId);
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        res.json(movie.toObject());
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getMovieById = getMovieById;
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const newMovie = yield movieModel_1.default.create({
            title: req.body.title,
            plot: req.body.plot,
            releaseYear: req.body.releaseYear,
            director: req.body.director,
            writers: req.body.writers,
            actors: req.body.actors,
            length: req.body.length,
            warType: req.body.warType,
            imdbRating: {
                userRating: (_a = req.body.imdbRating) === null || _a === void 0 ? void 0 : _a.userRating,
                expertRating: (_b = req.body.imdbRating) === null || _b === void 0 ? void 0 : _b.expertRating
            },
            language: req.body.language,
            country: req.body.country,
            media: {
                imageUrl: (_c = req.body.media) === null || _c === void 0 ? void 0 : _c.imageUrl,
                trailerUrl: (_d = req.body.media) === null || _d === void 0 ? void 0 : _d.trailerUrl
            }
        });
        res.status(201).json({ message: 'Movie created successfully', createdMovie: newMovie });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createMovie = createMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const movieId = req.params.id;
        const existingMovie = yield movieModel_1.default.findById(movieId);
        if (!existingMovie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        const updatedMovie = yield movieModel_1.default.findByIdAndUpdate(movieId, {
            title: req.body.title || existingMovie.title,
            plot: req.body.plot || existingMovie.plot,
            releaseYear: req.body.releaseYear || existingMovie.releaseYear,
            director: req.body.director || existingMovie.director,
            writers: req.body.writers || existingMovie.writers,
            actors: req.body.actors || existingMovie.actors,
            length: req.body.length || existingMovie.length,
            warType: req.body.warType || existingMovie.warType,
            imdbRating: {
                userRating: ((_a = req.body.imdbRating) === null || _a === void 0 ? void 0 : _a.userRating) || existingMovie.imdbRating.userRating,
                expertRating: ((_b = req.body.imdbRating) === null || _b === void 0 ? void 0 : _b.expertRating) || existingMovie.imdbRating.expertRating
            },
            language: req.body.language || existingMovie.language,
            country: req.body.country || existingMovie.country,
            media: {
                imageUrl: ((_c = req.body.media) === null || _c === void 0 ? void 0 : _c.imageUrl) || existingMovie.media.imageUrl,
                trailerUrl: ((_d = req.body.media) === null || _d === void 0 ? void 0 : _d.trailerUrl) || existingMovie.media.trailerUrl
            }
        }, { new: true });
        res.json({ message: 'Movie updated successfully', updatedMovie: updatedMovie });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieId = req.params.id;
        const movie = yield movieModel_1.default.findById(movieId);
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        yield movie.deleteOne();
        res.json({ message: 'Movie deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteMovie = deleteMovie;
