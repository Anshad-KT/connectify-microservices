import { IRequest, ResponseCreator, validateBody } from "@express-assist/connectify";
import { IBusinessUseCase } from "../../interfaces/use-case.interface.js";

export default function buildCreateBusinessController({
  businessUseCases,
}: {
  businessUseCases: IBusinessUseCase;
}) {
  return async (req: IRequest) => {
    const businessBody = req.body;
    validateBody(businessBody, ["name", "logo", "owner_id", "email", "phone", "description"]);

    const createdBusiness = await businessUseCases.createBusiness(businessBody);

    const response = new ResponseCreator();

    return response.setData(createdBusiness).setStatusCode(201);
  };
}