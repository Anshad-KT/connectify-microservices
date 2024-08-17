import { IAssignmentController, IProjectController, IResourceController, ITaskController } from "../interfaces/controller.interface";
import { projectUseCases, resourceUseCases, taskUseCases, assignmentsUseCases } from "../use-cases";
import buildAssignTaskController from "./assignment/assign-task.controller";
import buildRemoveTaskAssignmentController from "./assignment/remove-task.controller";
import buildAddEmployeeToProjectController from "./projects/add-employee-to-project.controller";
import buildCreateProjectController from "./projects/create-project.controller";
import buildDeleteProjectController from "./projects/delete-project.controller";
import buildGetProjectController from "./projects/get-project.controller";
import buildGetProjectsController from "./projects/get-projects.controller";
import buildRemoveEmployeeFromProjectController from "./projects/remove employee-from-project.controller";
import buildUpdateProjectStatusController from "./projects/update-project-task.controller";
import buildUpdateProjectController from "./projects/update-project.controller";
import buildCreateResourceController from "./resources/create-resource.controller";
import buildDeleteResourceController from "./resources/delete-resource.controller";
import buildGetResourcesByProjectIdController from "./resources/get-projects.controller";
import buildGetResourceController from "./resources/get-resource.controller";
import buildUpdateResourceController from "./resources/update-resource.controller";
import buildCreateTaskController from "./tasks/create-task.controller";
import buildDeleteTaskController from "./tasks/delete-task.controller";
import buildGetTaskController from "./tasks/get-task.controller";
import buildGetTasksController from "./tasks/get-tasks.controller";
import buildMarkTaskAsPriorityController from "./tasks/mark-task-priority";
import buildRemoveTaskDueDateController from "./tasks/remove-task-due-data.controller";
import buildUpdateTaskController from "./tasks/update-task-due-date.controller";

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