// Project model
import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { IProject } from "../../../interfaces/entity.interface";

export function projectModel(sequelize: Sequelize) {
  const ProjectModel: ModelDefined<IDBProject, IProject> = sequelize.define(
    "Project",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "todo",
          "in progress",
          "on hold",
          "in review",
          "ready for execution",
          "completed"
        ),
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      priority: {
        type: DataTypes.BOOLEAN,
      },
      businessId: {
        type: DataTypes.UUID,
      },
      tasks: {
        type: DataTypes.ARRAY(DataTypes.UUID),
      },
      resources: {
        type: DataTypes.ARRAY(DataTypes.UUID),
      },
      employees: {
        type: DataTypes.ARRAY(DataTypes.UUID),
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return ProjectModel;
}

export type IDBProject = IProject & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

