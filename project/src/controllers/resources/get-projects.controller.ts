import { IRequest, ResponseCreator, BadRequestError } from "@express-assist/connectify";
import { IResourceUseCase } from "../../interfaces/usecase.interface";
 
export default function buildGetResourcesByProjectIdController({
  resourceUseCases,
}: {
  resourceUseCases: IResourceUseCase;
}) {
  return async (req: IRequest) => {
    const projectId = req.params.projectId;
    if (!projectId) throw new BadRequestError();
    const resources = await resourceUseCases.getResourcesByProjectId({projectId});
    const response = new ResponseCreator();
    return response.setData(resources).setStatusCode(200);
  };
}