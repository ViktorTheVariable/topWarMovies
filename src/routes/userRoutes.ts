import express from 'express';
import { registerUser, loginUser, deleteUser, getAllUsers } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/auth/register', registerUser); 
userRouter.post('/auth/login', loginUser);
userRouter.get('/users', getAllUsers);
userRouter.delete('/users/:id', deleteUser);

export default userRouter;