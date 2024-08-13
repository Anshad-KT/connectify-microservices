import { BusinessNotFoundError, UserNotFoundError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildGetBusinessUseCase({
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
      return business;
    };
  }