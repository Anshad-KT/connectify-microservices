import { 
    IRequest, 
    ResponseCreator, 
    validateBody, 
    BadRequestError 
  } from "@express-assist/connectify";
import { IResourceUseCase } from "../../interfaces/usecase.interface";
   
  export default function buildCreateResourceController({
    resourceUseCases,
  }: {
    resourceUseCases: IResourceUseCase;
  }) {
    return async (req: IRequest) => {
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
      const createdResource = await resourceUseCases.createResource(resourceInput);
      const response = new ResponseCreator();
      return response.setData(createdResource).setStatusCode(201);
    };
  }