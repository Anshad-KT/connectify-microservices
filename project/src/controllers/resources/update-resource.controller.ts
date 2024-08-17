import { 
    IRequest, 
    ResponseCreator, 
    validateBody, 
    BadRequestError 
  } from "@express-assist/connectify";
import { IResourceUseCase } from "../../interfaces/usecase.interface";
   
  export default function buildUpdateResourceController({
    resourceUseCases,
  }: {
    resourceUseCases: IResourceUseCase;
  }) {
    return async (req: IRequest) => {
      const resourceId = req.params.resourceId;
      if (!resourceId) throw new BadRequestError();
      const resourceInput = req.body;
      validateBody(resourceInput, [
        "name",
        "description",
        "type",
        "url",
        "projectId",
        "uploadedBy",
        "taskId",
      ]);
      const updatedResource = await resourceUseCases.updateResource({ resourceId, ...resourceInput });
      const response = new ResponseCreator();
      return response.setData(updatedResource).setStatusCode(200);
    };
  }