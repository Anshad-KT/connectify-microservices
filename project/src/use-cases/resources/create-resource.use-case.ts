import { AnErrorOccurredError } from "@express-assist/connectify";
import { IResource, IResourceEntityConstructor } from "../../interfaces/entity.interface.js";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";

export default function buildCreateResourceUseCase({
    databaseRepository,
    ResourceEntity,
  }: {
    databaseRepository: IDatabaseRepository;
    ResourceEntity: IResourceEntityConstructor;
  }) {
    return async ({
      name,
      description,
      type,
      url,
      projectId,
      uploadedBy,
      taskId,
    }: IResource) => {
 
      const resource = new ResourceEntity({
        name,
        description,
        type,
        url,
        projectId,
        uploadedBy,
        uploadedTime: new Date(),
        taskId,
      });
      resource.validate();
  
      const createdResource = await databaseRepository.createResource(resource.get());
      if (!createdResource) throw new AnErrorOccurredError();
  
      return createdResource;
    };
  }