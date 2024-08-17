import { AnErrorOccurredError } from "@express-assist/connectify";
import { ITask, ITaskEntityConstructor } from "../../interfaces/entity.interface";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildCreateTaskUseCase({
    databaseRepository,
    TaskEntity,
  }: {
    databaseRepository: IDatabaseRepository;
    TaskEntity: ITaskEntityConstructor;
  }) {
    return async ({
      name,
      description,
      projectId,
      assignees,
      status,
      dueDate,
      priority,
    }: ITask) => {
      const task = new TaskEntity({
        name,
        description,
        projectId,
        assignees,
        status,
        dueDate,
        priority,
      });
      task.validate();
  
      const createdTask = await databaseRepository.createTask(task.get());
      if (!createdTask) throw new AnErrorOccurredError();
  
      return createdTask;
    };
  }