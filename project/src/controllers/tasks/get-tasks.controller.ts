import { BadRequestError, IRequest, ResponseCreator } from "@express-assist/connectify";
import { ITaskUseCase } from "../../interfaces/usecase.interface";
 
export default function buildGetTasksController({
  taskUseCases,
}: {
  taskUseCases: ITaskUseCase;
}) {
  return async (req: IRequest) => {
    const projectId = req.params.projectId;
    if (!projectId) throw new BadRequestError();

    const tasks = await taskUseCases.getTasks({ projectId });

    const response = new ResponseCreator();

    return response.setData(tasks).setStatusCode(200);
  };
}