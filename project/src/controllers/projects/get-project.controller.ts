import { IRequest, ResponseCreator, BadRequestError } from "@express-assist/connectify";
import { IProjectUseCase } from "../../interfaces/usecase.interface";

export default function buildGetProjectController({
  projectUseCases,
}: {
  projectUseCases: IProjectUseCase;
}) {
  return async (req: IRequest) => {
    const projectId = req.params.projectId;
    if (!projectId) throw new BadRequestError();
    const project = await projectUseCases.getProject({projectId});
    const response = new ResponseCreator();
    return response.setData(project).setStatusCode(200);
  };
}