import { IRequest, ResponseCreator, BadRequestError } from "@express-assist/connectify";
import { IProjectUseCase } from "../../interfaces/usecase.interface";
 
export default function buildUpdateProjectStatusController({
  projectUseCases,
}: {
  projectUseCases: IProjectUseCase;
}) {
  return async (req: IRequest) => {
    const projectId = req.params.projectId;
    if (!projectId) throw new BadRequestError();
    const status = req.body.status;
    if (!status) throw new BadRequestError();
    const updatedProject = await projectUseCases.updateProjectStatus({projectId, status});
    const response = new ResponseCreator();
    return response.setData(updatedProject).setStatusCode(200);
  };
}