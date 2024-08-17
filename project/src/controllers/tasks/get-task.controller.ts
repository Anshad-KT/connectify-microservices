import { BadRequestError, IRequest, ResponseCreator } from "@express-assist/connectify";
import { ITaskUseCase } from "../../interfaces/usecase.interface";
 
export default function buildGetTaskController({
  taskUseCases,
}: {
  taskUseCases: ITaskUseCase;
}) {
  return async (req: IRequest) => {
    const taskId = req.params.taskId;
    if (!taskId) throw new BadRequestError();

    const task = await taskUseCases.getTask({ taskId });

    const response = new ResponseCreator();

    return response.setData(task).setStatusCode(200);
  };
}