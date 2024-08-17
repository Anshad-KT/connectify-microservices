import { IRequest, ResponseCreator, validateBody } from "@express-assist/connectify";
import { ITaskUseCase } from "../../interfaces/usecase.interface";
 
export default function buildCreateTaskController({
  taskUseCases,
}: {
  taskUseCases: ITaskUseCase;
}) {
  return async (req: IRequest) => {
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

    const createdTask = await taskUseCases.createTask(taskInput);

    const response = new ResponseCreator();

    return response.setData(createdTask).setStatusCode(201);
  };
}