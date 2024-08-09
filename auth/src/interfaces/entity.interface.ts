import { Types } from "mongoose";

export interface IUser {
    name: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
}

export interface IVerification {
    user: string;
    code: number;
    expiresAt: Date;
}

export interface IUserEntity extends IUser {
    validate: () => void;
    get: () => IUser;
}

export interface IUserEntityConstructor {
    new (data: IUser): IUserEntity;
}