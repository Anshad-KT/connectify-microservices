import { AnErrorOccurredError } from "@express-assist/connectify";
import { IProject, IProjectEntityConstructor } from "../../interfaces/entity.interface.js";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";

export default function buildCreateProjectUseCase({
    databaseRepository,
    ProjectEntity,
  }: {
    databaseRepository: IDatabaseRepository;
    ProjectEntity: IProjectEntityConstructor;
  }) {
    return async ({
      businessId,description,dueDate,employees,name,priority,resources,status,tasks
    }: IProject) => {

      const project = new ProjectEntity({
        businessId,description,dueDate,employees,name,priority,resources,status,tasks
      });
      
      project.validate();
  
      const createdProject = await databaseRepository.createProject(project.get());
      if (!createdProject) throw new AnErrorOccurredError();
  
      return createdProject;
    };
  }