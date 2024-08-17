import { 
    IRequest, 
    ResponseCreator, 
    validateBody, 
    BadRequestError 
  } from "@express-assist/connectify";
import { IProjectUseCase } from "../../interfaces/usecase.interface";
import { IProject } from "../../interfaces/entity.interface";
  
  export default function buildUpdateProjectController({
    projectUseCases,
  }: {
    projectUseCases: IProjectUseCase;
  }) {
    return async (req: IRequest) => {
      const projectId = req.params.projectId;
      if (!projectId) throw new BadRequestError();
      const projectInput:IProject = req.body;
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
      const updateData = { ...projectInput, projectId };

      const updatedProject = await projectUseCases.updateProject(updateData);      
      const response = new ResponseCreator();
      return response.setData(updatedProject).setStatusCode(200);
    };
  }