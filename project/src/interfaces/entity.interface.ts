import { IEmployee } from "@express-assist/connectify/dist/interfaces/entity.interface";

export interface IProject {
    name: string;
    description: string;
    status: ProjectStatus; // todo, in progress, on hold, in review, ready for execution, completed

    dueDate: Date | null;
    priority: boolean;
    businessId: string; // reference to the business this project belongs to
    tasks: string[]; // tasks associated with the project
    resources: string[]; // resources associated with the project
    employees: string[]; // employees associated with the project
}

export interface ITask {
    name: string;
    description: string;
    status: TaskStatus; // todo, in progress, on hold, in review, ready for execution, completed

    dueDate: Date | null;
    priority: boolean;
    projectId: string; // reference to the project this task belongs to
    assignees: string[]; // employees assigned to this task
}

export interface IEmployeeAssignment {
    employeeId: string; // reference to the employee assigned to this task
    taskId: string; // reference to the task this employee is assigned to
}

export interface IResource {
    name: string;
    description: string;
    type: string; // e.g. "file", "link", "image", etc.
    url: string; // for links or files
    projectId: string; // reference to the project this resource belongs to
    uploadedBy: string;
    uploadedTime: Date;
    taskId: string; // reference to the task this resource is used in (optional)
}

export interface IProjectEntity extends IProject {
    validate: () => void;
    get: () => IProject;
}

export interface IProjectEntityConstructor {
    new(data: IProject): IProjectEntity;
}
export interface ITaskEntity extends ITask {
    validate: () => void;
    get: () => ITask;
}

export interface ITaskEntityConstructor {
    new(data: ITask): ITaskEntity;
}
export interface IEmployeeAssignmentEntity extends IEmployeeAssignment {
    validate: () => void;
    get: () => IEmployeeAssignment;
}

export interface IEmployeeAssignmentEntityConstructor {
    new(data: IEmployeeAssignment): IEmployeeAssignmentEntity;
}
export interface IResourceEntity extends IResource {
    validate: () => void;
    get: () => IResource;
}

export interface IResourceEntityConstructor {
    new(data: IResource): IResourceEntity;
}

export enum ProjectStatus {
    TODO,
    IN_PROGRESS,
    ON_HOLD,
    IN_REVIEW,
    READY_FOR_EXECUTION,
    COMPLETED
}

export enum TaskStatus {
    TODO,
    IN_PROGRESS,
    ON_HOLD,
    IN_REVIEW,
    READY_FOR_EXECUTION,
    COMPLETED
}