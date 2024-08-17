import { AnErrorOccurredError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildRemoveTaskDueDateUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({taskId}:{taskId: string}) => {
      if (!taskId) throw new AnErrorOccurredError();
      const removeTask = await databaseRepository.removeTaskDueDate(taskId);
      if (!removeTask) throw new AnErrorOccurredError();
      return removeTask;
    };
  }