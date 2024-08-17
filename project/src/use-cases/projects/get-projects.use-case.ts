import { AnErrorOccurredError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildGetProjectsUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({businessId}:{businessId: string}) => {
      if (!businessId || typeof businessId !== 'string') {
        throw new AnErrorOccurredError('Invalid business ID provided');
      }
 
        const projects = await databaseRepository.getProjectsByBusinessId(businessId);
        if (!projects) {
          throw new AnErrorOccurredError('No projects found for the given business ID');
        }
        return projects;
       
   
  }}