import express from 'express'
import BuildAssignmentsRoutes from './assignments/assignments.router.js';
import BuildProjectsRoutes from './projects/projects.router.js';
import BuildResourcesRoutes from './resources/resources.router.js';
import BuildTasksRoutes from './tasks/tasks.router.js';

import { projectControllers, resourceControllers, taskControllers, assignmentsControllers } from '../controllers/index.js'
import { verifyUserMiddleware } from '@express-assist/connectify';

const router = express.Router();

export const assignmentsRoutes = BuildAssignmentsRoutes({
    router,
    assignmentsControllers
});

export const projectsRoutes = BuildProjectsRoutes({
    router,
    projectControllers
});

export const resourcesRoutes = BuildResourcesRoutes({
    router,
    resourceControllers
});

export const tasksRoutes = BuildTasksRoutes({
    router,
    taskControllers
});

// If you want to apply verifyUserMiddleware to all routes, you can do it here:
// router.use(verifyUserMiddleware);

// Export the main router if needed
export default router;