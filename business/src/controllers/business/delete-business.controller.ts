import { IRequest, ResponseCreator, validateBody } from "@express-assist/connectify";
import { IBusinessUseCase } from "../../interfaces/use-case.interface.js";

export default function buildDeleteBusinessController({
    businessUseCases,
  }: {
    businessUseCases: IBusinessUseCase;
  }) {
    return async (req: IRequest) => {
      const businessId = req.params.businessId;
  
      const deleted = await businessUseCases.deleteBusiness({ businessId });
  
      const response = new ResponseCreator();
  
      if (!deleted) {
        return response.setStatusCode(404).setMessage("Business not found");
      }
  
      return response.setMessage("Business deleted").setStatusCode(200);
    };
  }