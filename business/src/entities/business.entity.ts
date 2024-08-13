import { BadRequestError } from "@express-assist/connectify";
import { IBusiness, IBusinessEntity } from "../interfaces/entity.interface.js";
import { z } from "zod";

export default class Business implements IBusinessEntity {
    name: string;
    logo: string;
    owner_id: number;
    email: string;
    phone: string;
    description: string;

    constructor(data: IBusiness) {
        this.name = data.name;
        this.logo = data.logo;
        this.owner_id = data.owner_id;
        this.email = data.email;
        this.phone = data.phone;
        this.description = data.description;
    }

    validate() {
        if (!this.name || this.name.length < 3) {
            throw new BadRequestError("Name should be at least 3 characters");
        }
        try {
            z.string().email().parse(this.email);
        } catch (error) {
            throw new BadRequestError("Invalid email");
        }
        if (!this.phone || this.phone.length < 10) {
            throw new BadRequestError("Phone number should be at least 10 characters");
        }
    }

    get() {
        return Object.freeze({
            name: this.name,
            logo: this.logo,
            owner_id: this.owner_id,
            email: this.email,
            phone: this.phone,
            description: this.description,
        });
    }
}