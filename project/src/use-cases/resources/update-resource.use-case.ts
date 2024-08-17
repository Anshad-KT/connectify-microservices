import { AnErrorOccurredError } from "@express-assist/connectify";
import { IResource, IResourceEntityConstructor } from "../../interfaces/entity.interface";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildUpdateResourceUseCase({
    databaseRepository,
    ResourceEntity,
  }: {
    databaseRepository: IDatabaseRepository;
    ResourceEntity: IResourceEntityConstructor;
  }) {
    return async ({
      resourceId,
      name,
      description,
      type,
      url,
      projectId,
      uploadedBy,
      
      taskId,
    }: IResource & {resourceId:string}) => {
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
  
      const updatedResource = await databaseRepository.updateResource(resourceId, resource.get());
      if (!updatedResource) throw new AnErrorOccurredError();
  
      return updatedResource;
    };
  }