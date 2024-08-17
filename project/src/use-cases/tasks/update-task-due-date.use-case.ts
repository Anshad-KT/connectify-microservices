import { AnErrorOccurredError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildUpdateTaskDueDateUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({dueDate,taskId}:{taskId: string, dueDate: Date}) => {
      if (!taskId) throw new AnErrorOccurredError();
      if (!dueDate) throw new AnErrorOccurredError();
      const updatedTask = await databaseRepository.updateTaskDueDate(taskId, dueDate);
      if (!updatedTask) throw new AnErrorOccurredError();
      return updatedTask;
    };
  }