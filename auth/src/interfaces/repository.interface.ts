import { IDBUser } from "../repository/sql/models/user.model.js";
import { IDBVerification } from "../repository/sql/models/verification.model.js";
import { IUser, IVerification } from "./entity.interface.js";

export type IDatabaseRepository = {
    addverificationCode(data: IVerification): Promise<IDBVerification>
        findVerification: (data: { user: string }) => Promise<IDBVerification | undefined>;
    findByEmail: (email: string) => Promise<IDBUser | undefined>;
    findByUsername: (username: string) => Promise<IDBUser | undefined>;
    addUser: (data: IUser) => Promise<IDBUser>;
    changePassword: (data: { id: string; newPassword: string }) => Promise<boolean>;
    editUser: (data: { id: string; userData: { name?: string; username?: string; email?: string; avatar?: string } }) => Promise<boolean>;
};
