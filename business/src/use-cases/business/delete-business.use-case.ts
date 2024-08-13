import { AnErrorOccurredError, BusinessNotFoundError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildDeleteBusinessUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({
      businessId,
    }: {
      businessId: string;
    }) => {
      const business = await databaseRepository.getBusiness(businessId);
      if (!business) throw new BusinessNotFoundError();
      const deleted = await databaseRepository.deleteBusiness(businessId);
      if (!deleted) throw new AnErrorOccurredError();
      return { message: "Business deleted successfully" };
    };
  }