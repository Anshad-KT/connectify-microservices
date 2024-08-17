import { BadRequestError } from "@express-assist/connectify";
import { IProject, IResource, ITask, ProjectStatus } from "../interfaces/entity.interface.js";
import { z } from "zod";
import { IEmployee } from "../../../business/src/interfaces/entity.interface.js";

export default class Project implements IProject {
  name: string;
  description: string;
  status: ProjectStatus;
  dueDate: Date | null;
  priority: boolean;
  businessId: string;
  tasks: string[];
  resources: string[];
  employees: string[];

  constructor(data: IProject) {
    this.name = data.name;
    this.description = data.description;
    this.status = data.status;
    this.dueDate = data.dueDate;
    this.priority = data.priority;
    this.businessId = data.businessId;
    this.tasks = data.tasks;
    this.resources = data.resources;
    this.employees = data.employees;
  }

  validate() {
    if (!this.name || this.name.length < 3) {
      throw new BadRequestError("Name should be at least 3 characters");
    }
    if (!this.description || this.description.length < 10) {
      throw new BadRequestError("Description should be at least 10 characters");
    }
    if (!this.status || !Object.values(ProjectStatus).includes(this.status)) {
      throw new BadRequestError("Invalid status");
    }
  }

  get() {
    return Object.freeze({
      name: this.name,
      description: this.description,
      status: this.status,
      dueDate: this.dueDate,
      priority: this.priority,
      businessId: this.businessId,
      tasks: this.tasks,
      resources: this.resources,
      employees: this.employees,
    });
  }
}