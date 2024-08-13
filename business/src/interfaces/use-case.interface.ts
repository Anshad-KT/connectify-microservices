import { IDBBusiness } from "@express-assist/connectify/dist/interfaces/entity.interface";
import { IEmployee, IDBEmployee, IBusiness } from "./entity.interface";

export interface IEmployeeUseCase {
    addEmployee: ({ businessId, userId, role }: { businessId: string; userId: string; role: string }) => Promise<IDBEmployee>;
    getAllEmployees: ({ businessId }: { businessId: string }) => Promise<IDBEmployee[]>;
    getEmployee: ({ businessId, username }: { businessId: string; username: string }) => Promise<IDBEmployee | null>;
    editEmployee: ({ businessId, username, email, role }: { businessId: string; username: string; email: string; role: string }) => Promise<boolean>;
    deleteEmployee: ({ businessId, id }: { businessId: string; id: string }) => Promise<{ message: string }>;
  }
  
  export interface IBusinessUseCase {
    createBusiness: ({ name, logo, owner_id, email, phone, description }: IBusiness) => Promise<IDBBusiness>;
    getBusiness: ({ businessId }: { businessId: string }) => Promise<IDBBusiness | null>;
    editBusiness: ({ businessId, name, logo, email, phone, description }: { businessId: string; name: string; logo: string; email: string; phone: string; description: string }) => Promise<boolean>;
    deleteBusiness: ({ businessId }: { businessId: string }) => Promise<{ message: string }>;
  }