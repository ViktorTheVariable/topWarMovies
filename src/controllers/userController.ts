import { IUser, users } from '../models/userModel';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Joi eller express-validator kan användas senare för att validera indata
const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        if (users.find(user => user.username === username)) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: IUser = {
            id: (users.length +1).toString(),
            username,
            password: hashedPassword,
            isAdmin: false,
            createdAt: new Date()
        };
        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
        }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const user = users.find(user => user.username === username);
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
            { id: user.id, isAdmin: user.isAdmin }, 
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

const getAllUsers = (req: Request, res: Response): void => {
    res.json(users);
};

const deleteUser = (req: Request, res: Response): void => {
    const userId = req.params.id;
    const userIndex = users.findIndex((u: IUser) => u.id === userId);
    if (userIndex === -1) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted successfully' });
};

export {
    registerUser,
    loginUser,
    getAllUsers,
    deleteUser
};