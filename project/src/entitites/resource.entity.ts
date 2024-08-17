import { BadRequestError } from "@express-assist/connectify";
import { IResource } from "../interfaces/entity.interface.js";
import { z } from "zod";

export default class Resource implements IResource {
  name: string;
  description: string;
  type: string;
  url: string;
  projectId: string;
  uploadedBy: string;
  uploadedTime: Date;
  taskId: string ;

  constructor(data: IResource) {
    this.name = data.name;
    this.description = data.description;
    this.type = data.type;
    this.url = data.url;
    this.projectId = data.projectId;
    this.uploadedBy = data.uploadedBy;
    this.uploadedTime = data.uploadedTime;
    this.taskId = data.taskId;
  }

  validate() {
    if (!this.name || this.name.length < 3) {
      throw new BadRequestError("Name should be at least 3 characters");
    }
    if (!this.description || this.description.length < 10) {
      throw new BadRequestError("Description should be at least 10 characters");
    }
    if (!this.type || !["file", "link", "image"].includes(this.type)) {
      throw new BadRequestError("Invalid type");
    }
    if (!this.url || this.url.length < 5) {
      throw new BadRequestError("URL should be at least 5 characters");
    }
  }

  get() {
    return Object.freeze({
      name: this.name,
      description: this.description,
      type: this.type,
      url: this.url,
      projectId: this.projectId,
      uploadedBy: this.uploadedBy,
      uploadedTime: this.uploadedTime,
      taskId: this.taskId,
    });
  }
}