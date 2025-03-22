import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

interface AuthUser {
    isAdmin: boolean;
}

interface AuthRequest extends Request {
    user?: AuthUser;
}

interface AuthRequest extends Request {
    userId?: string;
  }

export const userMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        next();
    } else {
        res.status(401).json({ message: 'Your not logged in' });
    }
}

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'your not logged in' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, isAdmin: boolean };
  
      if (decoded.isAdmin) {
        req.userId = decoded.id;
        next();
      } else {
        res.status(403).json({ message: 'Access denied. Admin rights required.' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Authentication failed. Please log in again to continue.' });
    }
  };