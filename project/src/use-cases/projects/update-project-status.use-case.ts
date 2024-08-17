import { AnErrorOccurredError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";
import { ProjectStatus } from "../../interfaces/entity.interface";

export default function buildUpdateProjectStatusUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({projectId,status}:{projectId: string, status: ProjectStatus}) => {
      const updatedProject = await databaseRepository.updateProjectStatus(projectId, status);
      if (!updatedProject) throw new AnErrorOccurredError();
      return updatedProject;
    };
  }