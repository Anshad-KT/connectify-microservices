import { AnErrorOccurredError } from '@express-assist/connectify'
import { IDatabaseRepository } from '../../interfaces/repository.interface';

export default function buildGetTasksUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({projectId}:{projectId:string}) => {
      const tasks = await databaseRepository.getTasks(projectId);
      if (!tasks) throw new AnErrorOccurredError();
      return tasks;
    };
  }