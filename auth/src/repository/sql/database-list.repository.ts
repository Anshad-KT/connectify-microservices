import { ModelDefined, Sequelize } from "sequelize";
import { logger } from "@express-assist/connectify";
import { IUser, IVerification } from "../../interfaces/entity.interface.js";
import { IDBUser, userModel } from "./models/user.model.js"; // Import user model
import { IDBVerification, verificationModel } from "./models/verification.model.js"; // Import user model

export class BuildDatabaseRepository {
    client: Sequelize;
    models: {
        User: ModelDefined<IDBUser, IUser>;
        Verification: ModelDefined<IDBVerification, IVerification>
    };

    constructor(sequelize: Sequelize) {
        const User = userModel(sequelize); // Initialize user model
        const Verification = verificationModel(sequelize)

        // Define associations
        User.hasOne(Verification, {
            foreignKey: "username",
            sourceKey: "user",
            as: "verification"
        });
        Verification.belongsTo(User, {
            foreignKey: "username",
            targetKey: "username",
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

    // User operations
    async findVerification(data: { user: string }) {
        const verification = await this.models.Verification.findOne({ where: { user:data.user } });
        return verification?.dataValues as IDBVerification;
    } 
    async addverificationCode(data: IVerification) {
        const user = await this.models.Verification.create(data);
        return user.dataValues as IDBVerification;
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

    async changePassword({ id, newPassword }: { id: string; newPassword: string }): Promise<boolean> {
        const updated = await this.models.User.update({ password: newPassword }, { where: { id } });
        return updated.length > 0;
    }

    async editUser({ id, userData }: { id: string; userData: { name?: string; username?: string; email?: string; avatar?: string } }) {
        const updated = await this.models.User.update(userData, { where: { id } });
        return updated.length > 0;
    }

}
