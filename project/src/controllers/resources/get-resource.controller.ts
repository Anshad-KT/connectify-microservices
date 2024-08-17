import { IRequest, ResponseCreator, BadRequestError } from "@express-assist/connectify";
import { IResourceUseCase } from "../../interfaces/usecase.interface";
 
export default function buildGetResourceController({
  resourceUseCases,
}: {
  resourceUseCases: IResourceUseCase;
}) {
  return async (req: IRequest) => {
    const resourceId = req.params.resourceId;
    if (!resourceId) throw new BadRequestError();
    const resource = await resourceUseCases.getResourceById({resourceId});
    const response = new ResponseCreator();
    return response.setData(resource).setStatusCode(200);
  };
}