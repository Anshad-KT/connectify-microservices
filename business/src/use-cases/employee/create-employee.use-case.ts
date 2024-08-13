import { AnErrorOccurredError } from "@express-assist/connectify";
import { IEmployeeEntityConstructor } from "@express-assist/connectify/dist/interfaces/entity.interface";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildAddEmployeeUseCase({
  databaseRepository,EmployeeEntity
}: {
  databaseRepository: IDatabaseRepository,EmployeeEntity:IEmployeeEntityConstructor;
}) {
  return async ({
    businessId,
    userId,
    role,
  }: {
    businessId: string;
    userId: string;
    role: string;
  }) => {
    const employee = new EmployeeEntity({
      userId,
      businessId,
      role,
    });
    employee.validate();
    const addedEmployee = await databaseRepository.addEmployeeToBusiness(businessId, employee.get());
    if (!addedEmployee) throw new AnErrorOccurredError();
    return addedEmployee;
  };
}