import express from 'express'
import BuildBusinessRoutes from './business/business.routers.js';
import BuildEmployeeRoutes from './employee/employee.routes.js';
import {businessControllers,employeeControllers} from '../controllers/index.js'
import { verifyUserMiddleware } from '@express-assist/connectify';

const router = express.Router();

export const businessRoutes = BuildBusinessRoutes({
    router,
    businessControllers
});

export const employeeRoutes = BuildEmployeeRoutes({
    router,employeeControllers
})