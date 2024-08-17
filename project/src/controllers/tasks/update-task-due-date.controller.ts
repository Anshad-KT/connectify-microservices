import { BadRequestError, IRequest, ResponseCreator, validateBody } from "@express-assist/connectify";
import { ITaskUseCase } from "../../interfaces/usecase.interface";

export default function buildUpdateTaskController({
  taskUseCases,
}: {
  taskUseCases: ITaskUseCase;
}) {
  return async (req: IRequest) => {
    const taskId = req.params.taskId;
    if (!taskId) throw new BadRequestError();
    const taskInput = req.body;
    validateBody(taskInput, [
      "name",
      "description",
      "projectId",
      "assignees",
      "status",
      "dueDate",
      "priority",
    ]);

    const updatedTask = await taskUseCases.updateTask({ taskId, ...taskInput });

    const response = new ResponseCreator();

    return response.setData(updatedTask).setStatusCode(200);
  };
}