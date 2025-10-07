// Business model
import { IBusiness } from "@express-assist/connectify/dist/interfaces/entity.interface.js";
import { DataTypes, ModelDefined, Sequelize } from "sequelize";

export function businessModel(sequelize: Sequelize) {
  const BusinessModel: ModelDefined<IDBBusiness, IBusiness> = sequelize.define(
    "Business",
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
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      owner_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return BusinessModel;
}

export type IDBBusiness = IBusiness & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
