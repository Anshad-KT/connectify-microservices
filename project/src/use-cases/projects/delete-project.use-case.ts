import { AnErrorOccurredError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildDeleteProjectUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({projectId}:{projectId: string}) => {
      const deletedProject = await databaseRepository.deleteProject(projectId);
      if (!deletedProject) throw new AnErrorOccurredError();
      return deletedProject;
    };
  }