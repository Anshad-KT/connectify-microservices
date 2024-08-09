import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import {  IUser } from "../../../interfaces/entity.interface.js";

export function userModel(sequelize: Sequelize) {
    const UserModel: ModelDefined<IDBUser, IUser> = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            timestamps: true,
            paranoid: true,
        }
    );

    return UserModel;
}

export type IDBUser = IUser & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
};
