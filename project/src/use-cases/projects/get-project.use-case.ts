import { AnErrorOccurredError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildGetProjectUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({projectId}:{projectId: string}) => {
      const project = await databaseRepository.getProject(projectId);
      if (!project) throw new AnErrorOccurredError();
      return project;
    };
  }