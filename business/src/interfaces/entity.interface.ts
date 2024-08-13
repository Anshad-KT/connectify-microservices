// IBusiness.ts
export interface IBusiness {
    name: string;
    logo: string;
    owner_id: number;
    email: string;
    phone: string;
    description: string;
  }
  
  // IBusinessEntity.ts
  export interface IBusinessEntity {
    validate(): void;
    get(): IBusiness;
  }

  export interface IEmployee {
    id?: string;
    userId: string;
    businessId: string;
    role: string;
  }
  
  export type IDBEmployee = IEmployee & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export interface IEmployeeEntity extends IEmployee {
    validate: () => void;
    get: () => IEmployee;
  }