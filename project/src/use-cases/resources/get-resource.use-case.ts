import { AnErrorOccurredError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildGetResourceByIdUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({resourceId}:{resourceId: string}) => {
      if (!resourceId) throw new AnErrorOccurredError();
      const resource = await databaseRepository.getResourceById(resourceId);
      if (!resource) throw new AnErrorOccurredError();
      return resource;
    };
  }