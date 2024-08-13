import { ModelDefined, Sequelize } from "sequelize";
import { logger } from "@express-assist/connectify";
import { IDBUser, userModel } from "./models/user.model.js"; // Import user model
import { employeeModel, IDBEmployee } from "./models/employee.model.js";
import { businessModel, IDBBusiness } from "./models/business.model.js";
import { IBusiness, IEmployee } from "../../interfaces/entity.interface.js";
import { IUser } from "@express-assist/connectify/dist/interfaces/entity.interface.js";

export class BuildDatabaseRepository {
    client: Sequelize;
    models: {
        User: ModelDefined<IDBUser, IUser>;
        Employee: ModelDefined<IDBEmployee, IEmployee>;
        Business: ModelDefined<IDBBusiness, IBusiness>;
    };

    constructor(sequelize: Sequelize) {
        const User = userModel(sequelize); // Initialize user model
        const Employee = employeeModel(sequelize)
        const Business = businessModel(sequelize)
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
}
