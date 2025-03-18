import mongoose from "mongoose";
import { IUser } from '../models/userModel';
import User from '../models/userModel';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Joi eller express-validator kan användas senare för att validera indata
const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (user) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: IUser = {
            username,
            password: hashedPassword,
            isAdmin: false,
            createdAt: new Date()
        };
        User.create(newUser);

        res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
        }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, 
            process.env.JWT_SECRET as string, 
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: 'Login successful', token });
        }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export {
    registerUser,
    loginUser,
    getAllUsers,
    deleteUser
};