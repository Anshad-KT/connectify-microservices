import { Sequelize, ModelDefined, DataTypes } from "sequelize";
import { IResource } from "../../../interfaces/entity.interface";

export function resourceModel(sequelize: Sequelize) {
    const ResourceModel: ModelDefined<IDBResource, IResource> = sequelize.define(
      "Resource",
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
        type: {
          type: DataTypes.STRING,
        },
        url: {
          type: DataTypes.STRING,
        },
        projectId: {
          type: DataTypes.UUID,
        },
        uploadedBy: {
          type: DataTypes.UUID,
        },
        uploadedTime: {
          type: DataTypes.DATE,
        },
        taskId: {
          type: DataTypes.UUID,
        },
      },
      {
        timestamps: true,
        paranoid: true,
      }
    );
  
    return ResourceModel;
  }
  
  export type IDBResource = IResource & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };