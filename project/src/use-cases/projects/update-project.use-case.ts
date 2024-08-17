import { AnErrorOccurredError } from "@express-assist/connectify";
import { IProject, IProjectEntityConstructor } from "../../interfaces/entity.interface";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildUpdateProjectUseCase({
    databaseRepository,
    ProjectEntity,
  }: {
    databaseRepository: IDatabaseRepository;
    ProjectEntity: IProjectEntityConstructor;
  }) {
    return async ({
      projectId,
      businessId,
      description,
      dueDate,
      employees,
      name,
      priority,
      resources,
      status,
      tasks,
    }: IProject & { projectId: string }) => {
        
      const project = new ProjectEntity({
        businessId,description,dueDate,employees,name,priority,resources,status,tasks
      });
      project.validate();
  
      const updatedProject = await databaseRepository.updateProject(projectId, project.get());
      if (!updatedProject) throw new AnErrorOccurredError();
  
      return updatedProject;
    };
  }