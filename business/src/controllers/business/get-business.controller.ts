import { IRequest, ResponseCreator, validateBody } from "@express-assist/connectify";
import { IBusinessUseCase } from "../../interfaces/use-case.interface.js";

export default function buildGetBusinessController({
    businessUseCases,
  }: {
    businessUseCases: IBusinessUseCase;
  }) {
    return async (req: IRequest) => {
      const businessId = req.params.businessId;
  
      const business = await businessUseCases.getBusiness({ businessId });
  
      const response = new ResponseCreator();
  
      if (!business) {
        return response.setStatusCode(404).setMessage("Business not found");
      }
  
      return response.setData(business).setStatusCode(200);
    };
  }
  