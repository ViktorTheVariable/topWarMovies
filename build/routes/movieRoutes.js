"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const movieRouter = express_1.default.Router();
movieRouter.get('/warmovies/', movieController_1.getAllMovies);
movieRouter.get('/warmovies/:id', authMiddleware_1.userMiddleware, movieController_1.getMovieById);
movieRouter.post('/warmovies/', authMiddleware_1.adminMiddleware, movieController_1.createMovie);
movieRouter.put('/warmovies/:id', authMiddleware_1.adminMiddleware, movieController_1.updateMovie);
movieRouter.delete('/warmovies/:id', authMiddleware_1.adminMiddleware, movieController_1.deleteMovie);
exports.default = movieRouter;
