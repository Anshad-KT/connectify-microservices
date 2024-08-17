import { BadRequestError, IRequest, ResponseCreator } from "@express-assist/connectify";
import { ITaskUseCase } from "../../interfaces/usecase.interface";
 
export default function buildMarkTaskAsPriorityController({
  taskUseCases,
}: {
  taskUseCases: ITaskUseCase;
}) {
  return async (req: IRequest) => {
    const taskId = req.params.taskId;
    if (!taskId) throw new BadRequestError();
    const priority = req.body.priority;
    if (typeof priority !== "boolean") throw new BadRequestError();

    const updatedTask = await taskUseCases.markTaskAsPriority({taskId, priority});

    const response = new ResponseCreator();

    return response.setData(updatedTask).setStatusCode(200);
  };
}