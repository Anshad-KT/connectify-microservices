import { IDBProject } from "../repository/sql/models/projects.model";
import { IProject, IResource, ITask, ProjectStatus } from "./entity.interface";

export interface IProjectUseCase {
    createProject: ({businessId,description,dueDate,employees,name,priority,resources,status,tasks}: IProject) => Promise<IProject>;
    getProject: ({projectId}:{projectId: string}) => Promise<IProject>;

    getProjects: ({businessId}:{businessId: string}) => Promise<IProject[]>;
    updateProject: (data: IProject& {projectId: string}) => Promise<boolean>;
    updateProjectStatus: ({projectId,status}:{projectId: string, status: ProjectStatus}) => Promise<boolean>;
    deleteProject: ({projectId}:{projectId: string}) => Promise<boolean>;
    addEmployeeToProject: ({employeeId,projectId}:{projectId: string, employeeId: string}) => Promise<IDBProject>;
    removeEmployeeFromProject: ({employeeId,projectId}:{projectId: string, employeeId: string}) => Promise<IDBProject>;
  }

  export interface ITaskUseCase {
    createTask: ({ name,
      description,
      projectId,
      assignees,
      status,
      dueDate,
      priority,}:ITask) => Promise<ITask>;
    deleteTask: ({taskId}:{taskId: string}) => Promise<boolean>;
    getTask: ({taskId}:{taskId: string}) => Promise<ITask>;
    markTaskAsPriority: ({priority,taskId}:{taskId: string, priority: boolean}) => Promise<boolean>;
    getTasks: ({projectId}:{projectId: string}) => Promise<ITask[]>;
    removeTaskDueDate: ({taskId}:{taskId: string}) => Promise<boolean>;
    updateTaskDueDate: ({dueDate,taskId}:{taskId: string, dueDate: Date}) => Promise<boolean>;
    updateTask: (data: ITask & { taskId: string }) => Promise<boolean>;
  }

  export interface IResourceUseCase {
    createResource: ({ name, description, type, url, projectId, uploadedBy, taskId }:IResource) => Promise<IResource>;
    deleteResource: ({resourceId}:{resourceId: string}) => Promise<boolean>;
    getResourceById: ({resourceId}:{resourceId: string}) => Promise<IResource>;
    getResourcesByProjectId: ({projectId}:{projectId: string}) => Promise<IResource[]>;
    updateResource: (data: IResource & { resourceId: string }) => Promise<boolean>;
  }

  export interface IAssignmentsUseCase {
    assignTask: ({taskId,userId}:{taskId: string, userId: string}) => Promise<ITask>;
    removeTaskAssignment: ({taskId,userId}:{taskId: string, userId: string}) => Promise<ITask>;
  }