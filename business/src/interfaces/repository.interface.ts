import { IUser } from "@express-assist/connectify/dist/interfaces/entity.interface";
import { IDBBusiness } from "../repository/sql/models/business.model";
import { IDBUser } from "../repository/sql/models/user.model";
import { IBusiness, IEmployee, IDBEmployee } from "./entity.interface";

export type IDatabaseRepository = {
    findByEmail: (email: string) => Promise<IDBUser | null>;
    findByUsername: (username: string) => Promise<IDBUser | null>;
    addUser: (data: IUser) => Promise<IDBUser>;
    editUser: (params: { id: string; userData: { name?: string; username?: string; email?: string; avatar?: string } }) => Promise<boolean>;
    createBusiness: (data: IBusiness) => Promise<IDBBusiness>;
    getAllBusinesses: () => Promise<IDBBusiness[]>;
    getBusiness: (id: string) => Promise<IDBBusiness | null>;
    editBusiness: (id: string, data: IBusiness) => Promise<boolean>;
    deleteBusiness: (id: string) => Promise<boolean>;
    addEmployeeToBusiness: (businessId: string, data: IEmployee) => Promise<IDBEmployee>;
    getAllEmployeesByBusinessId: (businessId: string) => Promise<IDBEmployee[]>;
    getEmployeeByBusinessIdAndUsername: (businessId: string, id: string) => Promise<IDBEmployee | null>;
    updateEmployee: (businessId: string, id: string, data: IEmployee) => Promise<boolean>;
    deleteEmployeeFromBusiness: (businessId: string, id: string) => Promise<boolean>;
  };
  