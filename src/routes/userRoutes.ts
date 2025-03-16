const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');

const userRouter = express.router();

userRouter.post('/api/v1/auth/register', registerUser);
userRouter.post('/api/v1/auth/login', loginUser);
userRouter.get('/api/v1/users', getAllUsers);

module.exports = userRouter;

export {};