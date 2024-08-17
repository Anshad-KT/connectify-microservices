import { IRequest, ResponseCreator, BadRequestError } from "@express-assist/connectify";
import { IProjectUseCase } from "../../interfaces/usecase.interface";
 
export default function buildDeleteProjectController({
  projectUseCases,
}: {
  projectUseCases: IProjectUseCase;
}) {
  return async (req: IRequest) => {
    const projectId = req.params.projectId;
    if (!projectId) throw new BadRequestError();
    const deletedProject = await projectUseCases.deleteProject({projectId});
    const response = new ResponseCreator();
    return response.setData(deletedProject).setStatusCode(200);
  };
}