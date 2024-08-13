import { AnErrorOccurredError, EmployeeNotFoundError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";
import { IEmployeeEntityConstructor } from "@express-assist/connectify/dist/interfaces/entity.interface";

export default function buildEditEmployeeUseCase({
    databaseRepository,EmployeeEntity
  }: {
    databaseRepository: IDatabaseRepository,EmployeeEntity:IEmployeeEntityConstructor;
  }) {
    return async ({
      businessId,
      username,
      role,
    }: {
      businessId: string;
      username: string;
      role: string;
    }) => {
      const employeeRow = await databaseRepository.getEmployeeByBusinessIdAndUsername(businessId, username);
      if (!employeeRow) throw new EmployeeNotFoundError();
      employeeRow.role = role;
      const employee = new EmployeeEntity(employeeRow)

      employee.validate();
    
      const updatedEmployee = await databaseRepository.updateEmployee(businessId,employee.id!, employee);
      if (!updatedEmployee) throw new AnErrorOccurredError();
      return updatedEmployee;
    };
  }