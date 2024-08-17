import { AnErrorOccurredError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildDeleteResourceUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({resourceId}:{resourceId: string}) => {
      if (!resourceId) throw new AnErrorOccurredError();
      const deletedResource = await databaseRepository.deleteResource(resourceId);
      if (!deletedResource) throw new AnErrorOccurredError();
      return deletedResource;
    };
  }