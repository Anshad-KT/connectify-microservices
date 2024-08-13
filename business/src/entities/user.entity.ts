import { BadRequestError } from "@express-assist/connectify";
import { IUser, IUserEntity } from "@express-assist/connectify/dist/interfaces/entity.interface";
import { z } from "zod";

export default class User implements IUserEntity {
    name: string;
    username: string;
    email: string;
    avatar: string;

    constructor(data: IUser) {
        this.name = data.name;
        this.username = data.username;
        this.email = data.email;
        this.avatar = data?.avatar!;
    }
    id?: string | undefined;

    

    get() {
        return Object.freeze({
            name: this.name,
            username: this.username,
            email: this.email,
            avatar: this.avatar,
        });
    }
}
