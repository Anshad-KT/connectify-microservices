import { IFile } from "@express-assist/connectify";
import { IUser } from "./entity.interface.js";
import { IDBUser } from "../repository/sql/models/user.model.js";

export type IAuthUseCase = {
    signUp: (userData: IUser) => Promise<IUser>;
    signIn: (userData: {
        email: string;
        password: string;
    }) => Promise<{ user: IUser; token: string }>;
    resendCode: ({ email }: {
        email: string;
    }) => Promise<void>
};

export type IUserUseCase = {
    changePassword: (data: {
        currentPassword: string;
        newPassword: string;
        username: string;
    }) => Promise<boolean>;
    getProfile: (data: { username: string }) => Promise<{
        email: string;
        username: string;
        avatar: string;
        name: string;
    }>;
    updateProfile?: (data: {
        email: string;
        name: string;
        imageInput: Express.Multer.File & IFile;
    }) => Promise<boolean>;
};
