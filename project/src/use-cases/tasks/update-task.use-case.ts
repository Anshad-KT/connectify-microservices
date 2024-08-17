import { AnErrorOccurredError } from "@express-assist/connectify";
import { ITask, ITaskEntityConstructor } from "../../interfaces/entity.interface";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildUpdateTaskUseCase({
    databaseRepository,
    TaskEntity,
  }: {
    databaseRepository: IDatabaseRepository;
    TaskEntity: ITaskEntityConstructor;
  }) {
    return async ({
      taskId,
      name,
      description,
      projectId,
      assignees,
      status,
      dueDate,
      priority,
    }: ITask & {taskId:string}) => {
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
  
      const updatedTask = await databaseRepository.updateTask(taskId, task.get());
      if (!updatedTask) throw new AnErrorOccurredError();
  
      return updatedTask;
    };
  }