import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import {  IUser, IVerification } from "../../../interfaces/entity.interface.js";

export function verificationModel(sequelize: Sequelize) {
    const VerificationModel: ModelDefined<IDBVerification, IVerification> = sequelize.define(
        "Verification",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                
            },
            user: {
                type: DataTypes.STRING,
                allowNull: false
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            
        },
        {
            timestamps: true,
            paranoid: true,
        }
    );

    return VerificationModel;
}

export type IDBVerification = IVerification & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
};
