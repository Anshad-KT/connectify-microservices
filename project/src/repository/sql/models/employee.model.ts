// Employee model
import { IEmployee } from "@express-assist/connectify/dist/interfaces/entity.interface";
import { DataTypes, ModelDefined, Sequelize } from "sequelize";

export function employeeModel(sequelize: Sequelize) {
  const EmployeeModel: ModelDefined<IDBEmployee, IEmployee> = sequelize.define(
    "Employee",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
       
      },
      businessId: {
        type: DataTypes.UUID,
        
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return EmployeeModel;
}

export type IDBEmployee = IEmployee & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
