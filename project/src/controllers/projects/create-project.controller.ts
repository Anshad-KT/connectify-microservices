import { 
    IRequest, 
    ResponseCreator, 
    validateBody, 
    BadRequestError 
  } from "@express-assist/connectify";
import { IProjectUseCase } from "../../interfaces/usecase.interface";
   
  export default function buildCreateProjectController({
    projectUseCases,
  }: {
    projectUseCases: IProjectUseCase;
  }) {
    return async (req: IRequest) => {
      const projectInput = req.body;
      validateBody(projectInput, [
        "businessId",
        "description",
        "dueDate",
        "employees",
        "name",
        "priority",
        "resources",
        "status",
        "tasks",
      ]);
      const createdProject = await projectUseCases.createProject(projectInput);
      const response = new ResponseCreator();
      return response.setData(createdProject).setStatusCode(201);
    };
  }