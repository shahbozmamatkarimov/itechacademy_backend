import express, { Router } from 'express';
import UserController from '../controlller/user.controller.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

// Create a new user
userRouter.post('/create', UserController.createUser);
// Login
userRouter.post('/login', UserController.login);
// Get all users
userRouter.get('/all', UserController.getAllUsers);
// Get user by Token
userRouter.get('/protected', authMiddleware, UserController.protectedRoute);
// Get user by ID
userRouter.get('/:id', UserController.getUserById);

export default userRouter;
