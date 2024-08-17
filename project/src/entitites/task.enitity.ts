import { BadRequestError } from "@express-assist/connectify";
import { IEmployeeAssignment, ITask, TaskStatus } from "../interfaces/entity.interface.js";
import { z } from "zod";

export default class Task implements ITask {
  name: string;
  description: string;
  status: TaskStatus;
  dueDate: Date | null;
  priority: boolean;
  projectId: string;
  assignees: string[];

  constructor(data: ITask) {
    this.name = data.name;
    this.description = data.description;
    this.status = data.status;
    this.dueDate = data.dueDate;
    this.priority = data.priority;
    this.projectId = data.projectId;
    this.assignees = data.assignees;
  }

  validate() {
    if (!this.name || this.name.length < 3) {
      throw new BadRequestError("Name should be at least 3 characters");
    }
    if (!this.description || this.description.length < 10) {
      throw new BadRequestError("Description should be at least 10 characters");
    }
    if (!this.status || !Object.values(TaskStatus).includes(this.status)) {
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
      projectId: this.projectId,
      assignees: this.assignees,
    });
  }
}