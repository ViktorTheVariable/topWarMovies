"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const userRouter = express_1.default.Router();
userRouter.post('/auth/register', userController_1.registerUser);
userRouter.post('/auth/login', userController_1.loginUser);
userRouter.get('/users', authMiddleware_1.adminMiddleware, userController_1.getAllUsers);
userRouter.delete('/users/:id', authMiddleware_1.adminMiddleware, userController_1.deleteUser);
exports.default = userRouter;
