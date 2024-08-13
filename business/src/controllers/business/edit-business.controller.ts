import { IRequest, ResponseCreator, validateBody } from "@express-assist/connectify";
import { IBusinessUseCase } from "../../interfaces/use-case.interface.js";




export default function buildEditBusinessController({
    businessUseCases,
  }: {
    businessUseCases: IBusinessUseCase;
  }) {
    return async (req: IRequest) => {
      const businessId = req.params.businessId;
      const businessBody = req.body;
      validateBody(businessBody, ["name", "logo", "email", "phone", "description"]);
  
      const updated = await businessUseCases.editBusiness({ businessId, ...businessBody });
  
      const response = new ResponseCreator();
  
      if (!updated) {
        return response.setStatusCode(404).setMessage("Business not found");
      }
  
      return response.setMessage("Business updated").setStatusCode(200);
    };
  }