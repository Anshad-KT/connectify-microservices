import { IAssignmentController, IProjectController, IResourceController, ITaskController } from "../interfaces/controller.interface.js";
import { projectUseCases, resourceUseCases, taskUseCases, assignmentsUseCases } from "../use-cases/index.js";
import buildAssignTaskController from "./assignment/assign-task.controller.js";
import buildRemoveTaskAssignmentController from "./assignment/remove-task.controller.js";
import buildAddEmployeeToProjectController from "./projects/add-employee-to-project.controller.js";
import buildCreateProjectController from "./projects/create-project.controller.js";
import buildDeleteProjectController from "./projects/delete-project.controller.js";
import buildGetProjectController from "./projects/get-project.controller.js";
import buildGetProjectsController from "./projects/get-projects.controller.js";
import buildRemoveEmployeeFromProjectController from "./projects/remove employee-from-project.controller.js";
import buildUpdateProjectStatusController from "./projects/update-project-task.controller.js";
import buildUpdateProjectController from "./projects/update-project.controller.js";
import buildCreateResourceController from "./resources/create-resource.controller.js";
import buildDeleteResourceController from "./resources/delete-resource.controller.js";
import buildGetResourcesByProjectIdController from "./resources/get-projects.controller.js";
import buildGetResourceController from "./resources/get-resource.controller.js";
import buildUpdateResourceController from "./resources/update-resource.controller.js";
import buildCreateTaskController from "./tasks/create-task.controller.js";
import buildDeleteTaskController from "./tasks/delete-task.controller.js";
import buildGetTaskController from "./tasks/get-task.controller.js";
import buildGetTasksController from "./tasks/get-tasks.controller.js";
import buildMarkTaskAsPriorityController from "./tasks/mark-task-priority.js";
import buildRemoveTaskDueDateController from "./tasks/remove-task-due-data.controller.js";
import buildUpdateTaskController from "./tasks/update-task-due-date.controller.js";

const addEmployeeToProject = buildAddEmployeeToProjectController({
    projectUseCases,
  });
  
  const createProject = buildCreateProjectController({
    projectUseCases,
  });
  
  const deleteProject = buildDeleteProjectController({
    projectUseCases,
  });
  
  const getProject = buildGetProjectController({
    projectUseCases,
  });
  
  const getProjects = buildGetProjectsController({
    projectUseCases,
  });
  
  const removeEmployeeFromProject = buildRemoveEmployeeFromProjectController({
    projectUseCases,
  });
  
  const updateProject = buildUpdateProjectController({
    projectUseCases,
  });
  
  const updateProjectStatus = buildUpdateProjectStatusController({
    projectUseCases,
  });
  const createResource = buildCreateResourceController({
    resourceUseCases,
  });
  
  const deleteResource = buildDeleteResourceController({
    resourceUseCases,
  });
  
  const getResource = buildGetResourceController({
    resourceUseCases,
  });
  
  const getResources = buildGetResourcesByProjectIdController({
    resourceUseCases,
  });
  
  const updateResource = buildUpdateResourceController({
    resourceUseCases,
  });
  const createTask = buildCreateTaskController({
    taskUseCases,
  });
  
  const deleteTask = buildDeleteTaskController({
    taskUseCases,
  });
  
  const getTask = buildGetTaskController({
    taskUseCases,
  });
  
  const getTasks = buildGetTasksController({
    taskUseCases,
  });
  
  const markTaskAsPriority = buildMarkTaskAsPriorityController({
    taskUseCases,
  });
  
  const removeTaskDueDate = buildRemoveTaskDueDateController({
    taskUseCases,
  });
  
  const updateTask = buildUpdateTaskController({
    taskUseCases,
  });
  
  // Note: assignTask and removeTaskAssignment controllers are missing in your code
  const createAssignment = buildAssignTaskController({
    assignmentsUseCases,
  });
  
  const removeAssignment = buildRemoveTaskAssignmentController({
    assignmentsUseCases,
  });
  
  const updateTaskDueDate = buildUpdateTaskController({
    taskUseCases,
  });
  export const assignmentsControllers: IAssignmentController = Object.freeze({
    createAssignment,removeAssignment
  })
  export const taskControllers: ITaskController = Object.freeze({
    createTask,
    deleteTask,
    getTask,
    getTasks,
    markTaskAsPriority,
    removeTaskDueDate,
    updateTask,
    updateTaskDueDate,
  });
  export const resourceControllers: IResourceController = Object.freeze({
    createResource,
    deleteResource,
    getResource,
    getResources,
    updateResource,
  });
  export const projectControllers: IProjectController = Object.freeze({
    addEmployeeToProject,
    createProject,
    deleteProject,
    getProject,
    getProjects,
    removeEmployeeFromProject,
    updateProject,
    updateProjectStatus,
  });