import express from 'express'
import BuildUserRoutes from './user.routes.js';
import BuildAuthRoutes from './auth.routes.js';
import {authControllers,userControllers} from '../controllers/index.js'
import { verifyUserMiddleware } from '@express-assist/connectify';

const router = express.Router();

export const userRoutes = BuildUserRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    userControllers
});

export const authRoutes = BuildAuthRoutes({
    router,authControllers
})