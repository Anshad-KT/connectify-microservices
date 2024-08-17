import { AnErrorOccurredError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildGetResourcesByProjectIdUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({projectId}:{projectId: string}) => {
      if (!projectId) throw new AnErrorOccurredError();
      const resources = await databaseRepository.getResourcesByProjectId(projectId);
      if (!resources) throw new AnErrorOccurredError();
      return resources;
    };
  }