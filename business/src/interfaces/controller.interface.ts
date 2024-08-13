import { IRequest, ResponseCreator } from "@express-assist/connectify";

export interface IBusinessController {
    createBusiness: (req: IRequest) => Promise<ResponseCreator>;
    getBusiness: (req: IRequest) => Promise<ResponseCreator>;
    editBusiness: (req: IRequest) => Promise<ResponseCreator>;
    deleteBusiness: (req: IRequest) => Promise<ResponseCreator>;
  }
  
  export interface IEmployeeController {
    getAllEmployees: (req: IRequest) => Promise<ResponseCreator>;
    getEmployee: (req: IRequest) => Promise<ResponseCreator>;
    addEmployee: (req: IRequest) => Promise<ResponseCreator>;
    editEmployee: (req: IRequest) => Promise<ResponseCreator>;
    deleteEmployee: (req: IRequest) => Promise<ResponseCreator>;
  }
  
