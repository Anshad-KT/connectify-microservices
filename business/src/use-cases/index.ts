import buildCreateBusinessUseCase from "./business/create-business.use-case.js";
import buildDeleteBusinessUseCase from "./business/delete-business.use-case.js";
import buildEditBusinessUseCase from "./business/edit-business.use-case.js";
import buildGetBusinessUseCase from "./business/get-buiness.use-case.js";
import buildAddEmployeeUseCase from "./employee/create-employee.use-case.js";
import buildDeleteEmployeeUseCase from "./employee/delete-employee.use-case.js";
import buildEditEmployeeUseCase from "./employee/edit-employee.use-case.js";
import buildGetAllEmployeesUseCase from "./employee/get-all-employees.use-case.js";
import buildGetEmployeeUseCase from "./employee/get-employee.use-case.js";
import entities from '../entities/index.js'
import {databaseRepository} from '../repository/sql/index.js'
import { IBusinessUseCase, IEmployeeUseCase } from "../interfaces/use-case.interface.js";
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