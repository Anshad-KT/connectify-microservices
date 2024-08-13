import { IRequest, ResponseCreator, validateBody } from "@express-assist/connectify";
import { IEmployeeUseCase } from "../../interfaces/use-case.interface.js";


export default function buildDeleteEmployeeController({
    employeeUseCases,
  }: {
    employeeUseCases: IEmployeeUseCase;
  }) {
    return async (req: IRequest) => {
      const businessId = req.params.businessId;
      const username = req.params.username;
  
      const deleted = await employeeUseCases.deleteEmployee({ businessId, id: username });
  
      const response = new ResponseCreator();
  
      if (!deleted) {
        return response.setStatusCode(404).setMessage("Employee not found");
      }
  
      return response.setMessage("Employee deleted").setStatusCode(200);
    };
  }