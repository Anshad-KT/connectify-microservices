import { AnErrorOccurredError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildGetAllEmployeesUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({
      businessId,
    }: {
      businessId: string;
    }) => {
      const employees = await databaseRepository.getAllEmployeesByBusinessId(businessId);
      if (!employees) throw new AnErrorOccurredError();
      return employees;
    };
  }