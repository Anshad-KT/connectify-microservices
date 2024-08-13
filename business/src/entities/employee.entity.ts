import { BadRequestError } from "@express-assist/connectify";
import { IEmployee, IEmployeeEntity } from "../interfaces/entity.interface.js";
import { z } from "zod";

export default class Employee implements IEmployeeEntity {
  userId: string;
  businessId: string;
  role: string;

  constructor(data: IEmployee) {
    this.userId = data.userId;
    this.businessId = data.businessId;
    this.role = data.role;
  }

  validate() {
    if (!this.userId || !this.businessId || !this.role) {
      throw new BadRequestError("User ID, Business ID, and Role are required");
    }
    try {
      z.string().uuid().parse(this.userId);
    } catch (error) {
      throw new BadRequestError("Invalid User ID");
    }
    if (!["admin", "manager", "staff"].includes(this.role)) {
      throw new BadRequestError("Invalid Role");
    }
  }

  get() {
    return Object.freeze({
      userId: this.userId,
      businessId: this.businessId,
      role: this.role,
    });
  }
}