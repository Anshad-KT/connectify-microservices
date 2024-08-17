import { ModelDefined, Sequelize } from "sequelize";
import { logger } from "@express-assist/connectify";
import { IDBUser, userModel } from "./models/user.model.js"; // Import user model
import { employeeModel, IDBEmployee } from "./models/employee.model.js";
import { businessModel, IDBBusiness } from "./models/business.model.js";
import { projectModel, IDBProject } from "./models/projects.model.js"; // Import project model
import { IBusiness, IEmployee, IUser } from "@express-assist/connectify/dist/interfaces/entity.interface.js";
import { IProject, IResource, ITask, ProjectStatus } from "../../interfaces/entity.interface.js";
import { IDBResource, resourceModel } from "./models/resources.model.js";
import { IDBTask, taskModel } from "./models/tasks.model.js";

export class BuildDatabaseRepository {
    client: Sequelize;
    models: {
        User: ModelDefined<IDBUser, IUser>;
        Employee: ModelDefined<IDBEmployee, IEmployee>;
        Business: ModelDefined<IDBBusiness, IBusiness>;
        Projects: ModelDefined<IDBProject, IProject>; // Add Project mode
        Resources: ModelDefined<IDBResource, IResource>; // Add Project mode
        Tasks: ModelDefined<IDBTask, ITask>; // Add Project mode
    };

    constructor(sequelize: Sequelize) {
        const User = userModel(sequelize); // Initialize user model
        const Employee = employeeModel(sequelize)
        const Business = businessModel(sequelize)
        const Projects = projectModel(sequelize) // Initialize project model
        const Resources = resourceModel(sequelize)
        const Tasks = taskModel(sequelize)
        // Define associations
        User.hasOne(Employee, {
            foreignKey: "userId",
            sourceKey: "id",
            as: "employee"
        });
        Employee.belongsTo(User, {
            foreignKey: "userId",
            targetKey: "id",
        });

        User.hasOne(Business, {
            foreignKey: "ownerId",
            sourceKey: "id",
            as: "business"
        });
        Business.belongsTo(User, {
            foreignKey: "ownerId",
            targetKey: "id",
        });

        Business.hasMany(Employee, {
            foreignKey: "businessId",
            sourceKey: "id",
            as: "employees"
        });
        Employee.belongsTo(Business, {
            foreignKey: "businessId",
            targetKey: "id",
        });
        // Define associations
        Projects.hasMany(Resources, {
            foreignKey: "projectId",
            sourceKey: "id",
            as: "resources"
        });
        Resources.belongsTo(Projects, {
            foreignKey: "projectId",
            targetKey: "id",
        });

        Projects.hasMany(Tasks, {
            foreignKey: "projectId",
            sourceKey: "id",
            as: "tasks"
        });
        Tasks.belongsTo(Projects, {
            foreignKey: "projectId",
            targetKey: "id",
        });

        Tasks.hasMany(Resources, {
            foreignKey: "taskId",
            sourceKey: "id",
            as: "resources"
        });
        Resources.belongsTo(Tasks, {
            foreignKey: "taskId",
            targetKey: "id",
        });

        Projects.belongsToMany(Employee, {
            through: "ProjectEmployees",
            foreignKey: "projectId",
            otherKey: "employeeId",
            as: "projectEmployees"
        });
        Employee.belongsToMany(Projects, {
            through: "ProjectEmployees",
            foreignKey: "employeeId",
            otherKey: "projectId",
            as: "projectEmployees"
        });

        Tasks.belongsToMany(Employee, {
            through: "TaskAssignees",
            foreignKey: "taskId",
            otherKey: "employeeId",
            as: "taskAssignees"
        });
        Employee.belongsToMany(Tasks, {
            through: "TaskAssignees",
            foreignKey: "employeeId",
            otherKey: "taskId",
            as: "taskAssignees"
        });
        sequelize
            .sync({ alter: true })
            .then((res) => {
                logger.info("Database sync status\t: Successful");
            })
            .catch((err) => {
                logger.error(err, "Database sync status\t: Failed");
            });

        this.client = sequelize;
        // @ts-ignore
        this.models = sequelize.models;
    }


    async findByEmail(email: string) {
        const user = await this.models.User.findOne({ where: { email } });
        return user?.dataValues as IDBUser;
    }

    async findByUsername(username: string) {
        const user = await this.models.User.findOne({ where: { username } });
        return user?.dataValues as IDBUser;
    }

    async addUser(data: IUser) {
        const user = await this.models.User.create(data);
        return user.dataValues as IDBUser;
    }



    async editUser({ id, userData }: { id: string; userData: { name?: string; username?: string; email?: string; avatar?: string } }) {
        const updated = await this.models.User.update(userData, { where: { id } });
        return updated.length > 0;
    }
    // Business repository functions
    async createBusiness(data: IBusiness) {
        const business = await this.models.Business.create(data);
        return business.dataValues as IDBBusiness;
    }

    async getAllBusinesses() {
        const businesses = await this.models.Business.findAll();
        return businesses.map((business) => business.dataValues) as IDBBusiness[];
    }

    async getBusiness(id: string) {
        const business = await this.models.Business.findByPk(id);
        return business?.dataValues as IDBBusiness;
    }

    async editBusiness(id: string, data: IBusiness) {
        const updated = await this.models.Business.update(data, { where: { id } });
        return updated.length > 0;
    }

    async deleteBusiness(id: string) {
        const deleted = await this.models.Business.destroy({ where: { id } });
        return deleted > 0;
    }

    // Employee repository functions
    async addEmployeeToBusiness(businessId: string, data: IEmployee) {
        const employee = await this.models.Employee.create({ ...data, businessId });
        return employee.dataValues as IDBEmployee;
    }

    async getAllEmployeesByBusinessId(businessId: string) {
        const employees = await this.models.Employee.findAll({ where: { businessId } });
        return employees.map((employee) => employee.dataValues) as IDBEmployee[];
    }

    async getEmployeeByBusinessIdAndUsername(businessId: string, id: string) {
        const employee = await this.models.Employee.findOne({ where: { businessId, id } });
        return employee?.dataValues as IDBEmployee;
    }

    async updateEmployee(businessId: string, id: string, data: IEmployee) {
        const updated = await this.models.Employee.update(data, { where: { businessId, id } });
        return updated.length > 0;
    }


    async deleteEmployeeFromBusiness(businessId: string, id: string) {
        const deleted = await this.models.Employee.destroy({ where: { businessId, id } });
        return deleted > 0;
    }

    // Project repository functions
async createProject(data: IProject) {
    const project = await this.models.Projects.create(data);
    return project.dataValues as IDBProject;
  }
  
  async getProject(id: string) {
    const project = await this.models.Projects.findByPk(id);
    return project?.dataValues as IDBProject;
  }
  
  async getProjectsByBusinessId(businessId: string) {
    const projects = await this.models.Projects.findAll({ where: { businessId } });
    return projects.map((project) => project.dataValues) as IDBProject[];
  }
  
  async updateProject(id: string, data: IProject) {
    const updated = await this.models.Projects.update(data, { where: { id } });
    return updated.length > 0;
  }
  
  async deleteProject(id: string) {
    const deleted = await this.models.Projects.destroy({ where: { id } });
    return deleted > 0;
  }
  
  async addEmployeeToProject(projectId: string, employeeId: string) {
    const project = await this.models.Projects.findByPk(projectId);
    if (project) {
      const employees = project.dataValues.employees || [];
      if (!employees.includes(employeeId)) {
        employees.push(employeeId);
        await project.update({ employees });
      }
    }
    return project?.dataValues as IDBProject;
  }
  
  async removeEmployeeFromProject(projectId: string, employeeId: string) {
    const project = await this.models.Projects.findByPk(projectId);
    if (project) {
      const employees = project.dataValues.employees || [];
      const index = employees.indexOf(employeeId);
      if (index !== -1) {
        employees.splice(index, 1);
        await project.update({ employees });
      }
    }
    return project?.dataValues as IDBProject;
  }
  
  async updateProjectStatus(projectId: string, status: ProjectStatus) {
    const updated = await this.models.Projects.update({ status }, { where: { id: projectId } });
    return updated.length > 0;
  }
  
  // Task repository functions
  async createTask(data: ITask) {
    const task = await this.models.Tasks.create(data);
    return task.dataValues;
  }
  
  async getTask(id: string) {
    const task = await this.models.Tasks.findByPk(id);
    return task?.dataValues;
  }
  
  async getTasks(projectId: string) {
    const tasks = await this.models.Tasks.findAll({ where: { projectId } });
    return tasks.map((task) => task.dataValues);
  }
  
  async updateTask(id: string, data: ITask) {
    const updated = await this.models.Tasks.update(data, { where: { id } });
    return updated.length > 0;
  }
  
  async deleteTask(id: string) {
    const deleted = await this.models.Tasks.destroy({ where: { id } });
    return deleted > 0;
  }
  
  async markTaskAsPriority(taskId: string, priority: boolean) {
    const updated = await this.models.Tasks.update({ priority }, { where: { id: taskId } });
    return updated.length > 0;
  }
  
  async removeTaskDueDate(taskId: string) {
    const updated = await this.models.Tasks.update({ dueDate: null }, { where: { id: taskId } });
    return updated.length > 0;
  }
  
  async updateTaskDueDate(taskId: string, dueDate: Date) {
    const updated = await this.models.Tasks.update({ dueDate }, { where: { id: taskId } });
    return updated.length > 0;
  }
  
  async assignTask(taskId: string, userId: string) {
    const task = await this.models.Tasks.findByPk(taskId);
    if (task) {
      const assignees = task.dataValues.assignees || [];
      if (!assignees.includes(userId)) {
        assignees.push(userId);
        await task.update({ assignees });
      }
    }
    return task?.dataValues as IDBTask;
  }
  
  async removeTaskAssignment(taskId: string, userId: string) {
    const task = await this.models.Tasks.findByPk(taskId);
    if (task) {
      const assignees = task.dataValues.assignees || [];
      const index = assignees.indexOf(userId);
      if (index !== -1) {
        assignees.splice(index, 1);
        await task.update({ assignees });
      }
    }
    return task?.dataValues as IDBTask;
  }
  
  
  // Resource repository functions
  async createResource(data: IResource) {
    const resource = await this.models.Resources.create(data);
    return resource.dataValues;
  }
  
  async getResourceById(id: string) {
    const resource = await this.models.Resources.findByPk(id);
    return resource?.dataValues;
  }
  
  async getResourcesByProjectId(projectId: string) {
    const resources = await this.models.Resources.findAll({ where: { projectId } });
    return resources.map((resource) => resource.dataValues);
  }
  
  async updateResource(id: string, data: IResource) {
    const updated = await this.models.Resources.update(data, { where: { id } });
    return updated.length > 0;
  }
  
  async deleteResource(id: string) {
    const deleted = await this.models.Resources.destroy({ where: { id } });
    return deleted > 0;
  }

}
