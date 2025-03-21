import express from 'express';
import { registerUser, loginUser, deleteUser, getAllUsers } from '../controllers/userController';
import { adminMiddleware } from '../middleware/authMiddleware';

const userRouter = express.Router();

userRouter.post('/auth/register', registerUser); 
userRouter.post('/auth/login', loginUser);
userRouter.get('/users', adminMiddleware, getAllUsers);
userRouter.delete('/users/:id', adminMiddleware, deleteUser);

export default userRouter;