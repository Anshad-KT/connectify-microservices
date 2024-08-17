import { IRequest, ResponseCreator } from "@express-assist/connectify";

export type IProjectController = {
    getProjects: (req:IRequest) => Promise<ResponseCreator>;
    createProject: (req:IRequest) => Promise<ResponseCreator>;
    getProject: (req:IRequest) => Promise<ResponseCreator>;
    updateProject: (req:IRequest) => Promise<ResponseCreator>;
    deleteProject: (req:IRequest) => Promise<ResponseCreator>;
    updateProjectStatus: (req:IRequest) => Promise<ResponseCreator>;
    addEmployeeToProject:(req:IRequest) => Promise<ResponseCreator>;
    removeEmployeeFromProject:(req:IRequest) => Promise<ResponseCreator>;
  };

  export type ITaskController = {
    getTasks: (req:IRequest) => Promise<ResponseCreator>;
    createTask: (req:IRequest) => Promise<ResponseCreator>;
    getTask: (req:IRequest) => Promise<ResponseCreator>;
    updateTask: (req:IRequest) => Promise<ResponseCreator>;
    deleteTask: (req:IRequest) => Promise<ResponseCreator>;
    updateTaskDueDate: (req:IRequest) => Promise<ResponseCreator>;
    removeTaskDueDate: (req:IRequest) => Promise<ResponseCreator>;
    markTaskAsPriority: (req:IRequest) => Promise<ResponseCreator>;
  };

  export type IResourceController = {
    getResources: (req:IRequest) => Promise<ResponseCreator>;
    createResource: (req:IRequest) => Promise<ResponseCreator>;
    getResource: (req:IRequest) => Promise<ResponseCreator>;
    updateResource: (req:IRequest) => Promise<ResponseCreator>;
    deleteResource: (req:IRequest) => Promise<ResponseCreator>;
  };

  export type IAssignmentController = {
    createAssignment: (req:IRequest) => Promise<ResponseCreator>;
    removeAssignment: (req:IRequest) => Promise<ResponseCreator>;
  };