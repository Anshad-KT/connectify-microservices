import { AnErrorOccurredError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildAssignTaskUseCase({
    databaseRepository,
  }: {
    databaseRepository: IDatabaseRepository;
  }) {
    return async ({taskId,userId}:{taskId: string, userId: string}) => {
      if (!taskId) throw new AnErrorOccurredError();
      if (!userId) throw new AnErrorOccurredError();

      const updatedTask = await databaseRepository.assignTask(taskId, userId);

      if (!updatedTask) throw new AnErrorOccurredError();
      return updatedTask;
    };
  }