import { databaseRepository } from "../repository/sql/index";
import buildAddEmployeeToProjectUseCase from "./projects/add-employee.use-case";
import buildCreateProjectUseCase from "./projects/create-project.use-case";
import buildDeleteProjectUseCase from "./projects/delete-project.use-case";
import buildGetProjectUseCase from "./projects/get-project.use-case";
import buildGetProjectsUseCase from "./projects/get-projects.use-case";
import buildRemoveEmployeeFromProjectUseCase from "./projects/remove-employee.use-case";
import buildUpdateProjectStatusUseCase from "./projects/update-project-status.use-case";
import buildUpdateProjectUseCase from "./projects/update-project.use-case";
import projectsEntities from '../entitites/index'
import { IAssignmentsUseCase, IProjectUseCase, IResourceUseCase, ITaskUseCase } from "../interfaces/usecase.interface";
import buildUpdateTaskUseCase from "./tasks/update-task.use-case";
import buildCreateTaskUseCase from "./tasks/create-task.use-case";
import buildDeleteTaskUseCase from "./tasks/delete-task.use-case";
import buildGetTaskUseCase from "./tasks/get-task.use-case";
import buildGetTasksUseCase from "./tasks/get-tasks.use-case";
import buildMarkTaskAsPriorityUseCase from "./tasks/mark-task-priority.use-case";
import buildRemoveTaskDueDateUseCase from "./tasks/remove-task-due-date.use-case";
import buildUpdateTaskDueDateUseCase from "./tasks/update-task-due-date.use-case";
import buildCreateResourceUseCase from "./resources/create-resource.use-case";
import buildDeleteResourceUseCase from "./resources/delete-resource.use-case";
import buildGetResourceByIdUseCase from "./resources/get-resource.use-case";
import buildGetResourcesByProjectIdUseCase from "./resources/get-resources.use-case";
import buildUpdateResourceUseCase from "./resources/update-resource.use-case";
import buildRemoveTaskAssignmentUseCase from "./assignments/assign-task-remove.use-case";
import buildAssignTaskUseCase from "./assignments/assign-task.use-case";


const createProject = buildCreateProjectUseCase({
    databaseRepository,
    ProjectEntity: projectsEntities.Project,
  });
  
  const getProject = buildGetProjectUseCase({
    databaseRepository,
  });
  
  const getProjects = buildGetProjectsUseCase({
    databaseRepository,
  });
  
  const updateProject = buildUpdateProjectUseCase({
    databaseRepository,
    ProjectEntity: projectsEntities.Project,
  });
  
  const updateProjectStatus = buildUpdateProjectStatusUseCase({
    databaseRepository,
  });
  
  const deleteProject = buildDeleteProjectUseCase({
    databaseRepository,
  });
  
  const addEmployeeToProject = buildAddEmployeeToProjectUseCase({
    databaseRepository,
  });
  
  const removeEmployeeFromProject = buildRemoveEmployeeFromProjectUseCase({
    databaseRepository,
  });
  
  const createTask = buildCreateTaskUseCase({
    databaseRepository,
    TaskEntity: projectsEntities.Task,
  });
  
  const deleteTask = buildDeleteTaskUseCase({
    databaseRepository,
  });
  
  const getTask = buildGetTaskUseCase({
    databaseRepository,
  });
  
  const markTaskAsPriority = buildMarkTaskAsPriorityUseCase({
    databaseRepository,
  });
  
  const getTasks = buildGetTasksUseCase({
    databaseRepository,
  });
  
  const removeTaskDueDate = buildRemoveTaskDueDateUseCase({
    databaseRepository,
  });
  
  const updateTaskDueDate = buildUpdateTaskDueDateUseCase({
    databaseRepository,
  });
  
  const updateTask = buildUpdateTaskUseCase({
    databaseRepository,
    TaskEntity: projectsEntities.Task,
  });

  const createResource = buildCreateResourceUseCase({
    databaseRepository,
    ResourceEntity: projectsEntities.Resource,
  });
  
  const deleteResource = buildDeleteResourceUseCase({
    databaseRepository,
  });
  
  const getResourceById = buildGetResourceByIdUseCase({
    databaseRepository,
  });
  
  const getResourcesByProjectId = buildGetResourcesByProjectIdUseCase({
    databaseRepository,
  });
  
  const updateResource = buildUpdateResourceUseCase({
    databaseRepository,
    ResourceEntity: projectsEntities.Resource,
  });
  
  const assignTask = buildAssignTaskUseCase({
    databaseRepository,
  });
  
  const removeTaskAssignment = buildRemoveTaskAssignmentUseCase({
    databaseRepository,
  });
  
  export const assignmentsUseCases: IAssignmentsUseCase = Object.freeze({
    assignTask,
    removeTaskAssignment,
  })

  export const resourceUseCases: IResourceUseCase = Object.freeze({
    createResource,
    deleteResource,
    getResourceById,
    getResourcesByProjectId,
    updateResource,
  });
  
  export const taskUseCases: ITaskUseCase = Object.freeze({
    createTask,
    deleteTask,
    getTask,
    markTaskAsPriority,
    getTasks,
    removeTaskDueDate,
    updateTaskDueDate,
    updateTask,
  });


  export const projectUseCases: IProjectUseCase = Object.freeze({
    createProject,
    getProject,
    getProjects,
    updateProject,
    updateProjectStatus,
    deleteProject,
    addEmployeeToProject,
    removeEmployeeFromProject,
  });