import { BadRequestError, IRequest, ResponseCreator } from "@express-assist/connectify";
import { ITaskUseCase } from "../../interfaces/usecase.interface";
 
export default function buildDeleteTaskController({
  taskUseCases,
}: {
  taskUseCases: ITaskUseCase;
}) {
  return async (req: IRequest) => {
    const taskId = req.params.taskId;
    if (!taskId) throw new BadRequestError();

    const deletedTask = await taskUseCases.deleteTask({ taskId });

    const response = new ResponseCreator();

    return response.setData(deletedTask).setStatusCode(200);
  };
}