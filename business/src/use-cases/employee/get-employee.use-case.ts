import { EmployeeNotFoundError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildGetEmployeeUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({
      businessId,
      username,
    }: {
      businessId: string;
      username: string;
    }) => {
      const employee = await databaseRepository.getEmployeeByBusinessIdAndUsername(businessId, username);
      if (!employee) throw new EmployeeNotFoundError();
      return employee;
    };
  }