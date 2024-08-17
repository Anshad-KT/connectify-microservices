import { AnErrorOccurredError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildMarkTaskAsPriorityUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({priority,taskId}:{taskId: string, priority: boolean}) => {
      if (!taskId) throw new AnErrorOccurredError();
      if (typeof priority !== 'boolean') throw new AnErrorOccurredError();
      const updatedTask = await databaseRepository.markTaskAsPriority(taskId, priority);
      if (!updatedTask) throw new AnErrorOccurredError();
      return updatedTask;
    };
  }