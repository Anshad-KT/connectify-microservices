import { AnErrorOccurredError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildDeleteTaskUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({taskId}:{taskId: string}) => {
      if (!taskId) throw new AnErrorOccurredError();
      const deletedTask = await databaseRepository.deleteTask(taskId);
      if (!deletedTask) throw new AnErrorOccurredError();
      return deletedTask;
    };
  }