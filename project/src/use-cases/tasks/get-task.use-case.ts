import { AnErrorOccurredError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildGetTaskUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({taskId}:{taskId: string}) => {
      if (!taskId) throw new AnErrorOccurredError();
      const task = await databaseRepository.getTask(taskId);
      if (!task) throw new AnErrorOccurredError();
      return task;
    };
  }