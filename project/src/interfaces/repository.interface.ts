import { IDBUser, IUser, IBusiness, IDBBusiness, IEmployee, IDBEmployee } from "@express-assist/connectify/dist/interfaces/entity.interface";
import { IDBProject } from "../repository/sql/models/projects.model";
import { IProject, ProjectStatus, ITask, IResource } from "./entity.interface";

export type IDatabaseRepository = {
    // User repository functions
    findByEmail: (email: string) => Promise<IDBUser | undefined>;
    findByUsername: (username: string) => Promise<IDBUser | undefined>;
    addUser: (data: IUser) => Promise<IDBUser>;
    editUser: (data: { id: string; userData: { name?: string; username?: string; email?: string; avatar?: string } }) => Promise<boolean>;
   
    // Business repository functions
    createBusiness: (data: IBusiness) => Promise<IDBBusiness>;
    getAllBusinesses: () => Promise<IDBBusiness[]>;
    getBusiness: (id: string) => Promise<IDBBusiness | undefined>;
    editBusiness: (id: string, data: IBusiness) => Promise<boolean>;
    deleteBusiness: (id: string) => Promise<boolean>;
  
    // Employee repository functions
    addEmployeeToBusiness: (businessId: string, data: IEmployee) => Promise<IDBEmployee>;
    getAllEmployeesByBusinessId: (businessId: string) => Promise<IDBEmployee[]>;
    getEmployeeByBusinessIdAndUsername: (businessId: string, id: string) => Promise<IDBEmployee | undefined>;
    updateEmployee: (businessId: string, id: string, data: IEmployee) => Promise<boolean>;
    deleteEmployeeFromBusiness: (businessId: string, id: string) => Promise<boolean>;
  
    // Project repository functions
    createProject: (data: IProject) => Promise<IDBProject>;
    getProject: (id: string) => Promise<IDBProject | undefined>;
    getProjectsByBusinessId: (businessId: string) => Promise<IDBProject[]>;
    updateProject: (id: string, data: IProject) => Promise<boolean>;
    deleteProject: (id: string) => Promise<boolean>;
    addEmployeeToProject: (projectId: string, employeeId: string) => Promise<IDBProject>;
    removeEmployeeFromProject: (projectId: string, employeeId: string) => Promise<IDBProject>;
    updateProjectStatus: (projectId: string, status: ProjectStatus) => Promise<boolean>;
  
    // Task repository functions
    createTask: (data: ITask) => Promise<ITask>;
    getTask: (id: string) => Promise<ITask | undefined>;
    getTasks: (projectId: string) => Promise<ITask[]>;
    updateTask: (id: string, data: ITask) => Promise<boolean>;
    deleteTask: (id: string) => Promise<boolean>;
    markTaskAsPriority: (taskId: string, priority: boolean) => Promise<boolean>;
    removeTaskDueDate: (taskId: string) => Promise<boolean>;
    updateTaskDueDate: (taskId: string, dueDate: Date) => Promise<boolean>;
    assignTask: (taskId: string, userId: string) => Promise<ITask>;
    removeTaskAssignment: (taskId: string, userId: string) => Promise<ITask>;
  
    // Resource repository functions
    createResource: (data: IResource) => Promise<IResource>;
    getResourceById: (id: string) => Promise<IResource | undefined>;
    getResourcesByProjectId: (projectId: string) => Promise<IResource[]>;
    updateResource: (id: string, data: IResource) => Promise<boolean>;
    deleteResource: (id: string) => Promise<boolean>;
  };