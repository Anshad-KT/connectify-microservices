import { AnErrorOccurredError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildAddEmployeeToProjectUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({employeeId,projectId}:{projectId: string, employeeId: string}) => {
      const project = await databaseRepository.getProject(projectId);
      if (!project) throw new AnErrorOccurredError();
  
      const updatedProject = await databaseRepository.addEmployeeToProject(projectId, employeeId);
      if (!updatedProject) throw new AnErrorOccurredError();
  
      return updatedProject;
    };
}