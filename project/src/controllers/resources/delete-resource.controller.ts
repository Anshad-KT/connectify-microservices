import { IRequest, ResponseCreator, BadRequestError } from "@express-assist/connectify";
import { IResourceUseCase } from "../../interfaces/usecase.interface";

export default function buildDeleteResourceController({
  resourceUseCases,
}: {
  resourceUseCases: IResourceUseCase;
}) {
  return async (req: IRequest) => {
    const resourceId = req.params.resourceId;
    if (!resourceId) throw new BadRequestError();
    const deletedResource = await resourceUseCases.deleteResource({resourceId});
    const response = new ResponseCreator();
    return response.setData(deletedResource).setStatusCode(200);
  };
}