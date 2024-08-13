import { AnErrorOccurredError, EmployeeNotFoundError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildDeleteEmployeeUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({
      businessId,
      id,
    }: {
      businessId: string;
      id: string;
    }) => {
      const employee = await databaseRepository.getEmployeeByBusinessIdAndUsername(businessId, id);
      if (!employee) throw new EmployeeNotFoundError();
      const deleted = await databaseRepository.deleteEmployeeFromBusiness(businessId, id);
      if (!deleted) throw new AnErrorOccurredError();
      return { message: "Employee deleted successfully" };
    };
  }