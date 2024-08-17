import { IRequest, ResponseCreator, BadRequestError } from "@express-assist/connectify";
import { IProjectUseCase } from "../../interfaces/usecase.interface";
 
export default function buildAddEmployeeToProjectController({
  projectUseCases,
}: {
  projectUseCases: IProjectUseCase;
}) {
  return async (req: IRequest) => {
    const projectId = req.params.projectId;
    if (!projectId) throw new BadRequestError();
    const employeeId = req.body.employeeId;
    if (!employeeId) throw new BadRequestError();
    const updatedProject = await projectUseCases.addEmployeeToProject({projectId, employeeId});
    const response = new ResponseCreator();
    return response.setData(updatedProject).setStatusCode(200);
  };
}