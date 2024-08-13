import buildCreateBusinessUseCase from "./business/create-business.use-case";
import buildDeleteBusinessUseCase from "./business/delete-business.use-case";
import buildEditBusinessUseCase from "./business/edit-business.use-case";
import buildGetBusinessUseCase from "./business/get-buiness.use-case";
import buildAddEmployeeUseCase from "./employee/create-employee.use-case";
import buildDeleteEmployeeUseCase from "./employee/delete-employee.use-case";
import buildEditEmployeeUseCase from "./employee/edit-employee.use-case";
import buildGetAllEmployeesUseCase from "./employee/get-all-employees.use-case";
import buildGetEmployeeUseCase from "./employee/get-employee.use-case";
import entities from '../entities/index'
import {databaseRepository} from '../repository/sql/index'
import { IBusinessUseCase, IEmployeeUseCase } from "../interfaces/use-case.interface";
// Employee use cases

  
  const addEmployee = buildAddEmployeeUseCase({
    databaseRepository,
    EmployeeEntity: entities.Employee,
  });
  
  const getAllEmployees = buildGetAllEmployeesUseCase({
    databaseRepository,
  });
  
  const getEmployee = buildGetEmployeeUseCase({
    databaseRepository,
  });
  
  const editEmployee = buildEditEmployeeUseCase({
    databaseRepository,
    EmployeeEntity: entities.Employee,

  });
  
  const deleteEmployee = buildDeleteEmployeeUseCase({
    databaseRepository,
  });
  
  // Business use cases

  
  const createBusiness = buildCreateBusinessUseCase({
    databaseRepository,
    BusinessEntity: entities.Business,
  });
  
  
  
  const getBusiness = buildGetBusinessUseCase({
    databaseRepository,
  });
  
  const editBusiness = buildEditBusinessUseCase({
    databaseRepository,    BusinessEntity: entities.Business,

  });
  
  const deleteBusiness = buildDeleteBusinessUseCase({
    databaseRepository,
  });


  export const employeeUseCases: IEmployeeUseCase = Object.freeze({
    addEmployee,
    getAllEmployees,
    getEmployee,
    editEmployee,
    deleteEmployee,
  });

  export const businessUseCases: IBusinessUseCase = Object.freeze({
    createBusiness,
    getBusiness,
    editBusiness,
    deleteBusiness,
  });