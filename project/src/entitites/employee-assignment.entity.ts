import { BadRequestError } from "@express-assist/connectify";
import { IEmployeeAssignment } from "../interfaces/entity.interface.js";

export default class EmployeeAssignment implements IEmployeeAssignment {
  employeeId: string;
  taskId: string;

  constructor(data: IEmployeeAssignment) {
    this.employeeId = data.employeeId;
    this.taskId = data.taskId;
  }

  validate() {
    if (!this.employeeId || this.employeeId.length < 3) {
      throw new BadRequestError("Employee ID should be at least 3 characters");
    }
    if (!this.taskId || this.taskId.length < 3) {
      throw new BadRequestError("Task ID should be at least 3 characters");
    }
  }

  get() {
    return Object.freeze({
      employeeId: this.employeeId,
      taskId: this.taskId,
    });
  }
}