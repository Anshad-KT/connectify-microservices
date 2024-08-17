import { IRequest, ResponseCreator, BadRequestError } from "@express-assist/connectify";
import { IProjectUseCase } from "../../interfaces/usecase.interface";

export default function buildGetProjectsController({
  projectUseCases,
}: {
  projectUseCases: IProjectUseCase;
}) {
  return async (req: IRequest) => {
    const businessId = req.params.businessId;
    if (!businessId) throw new BadRequestError();
    const projects = await projectUseCases.getProjects({businessId});
    const response = new ResponseCreator();
    return response.setData(projects).setStatusCode(200);
  };
}