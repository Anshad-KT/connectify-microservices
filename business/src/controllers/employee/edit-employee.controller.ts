import { IRequest, ResponseCreator, validateBody } from "@express-assist/connectify";
import { IEmployeeUseCase } from "../../interfaces/use-case.interface.js";

export default function buildEditEmployeeController({
    employeeUseCases,
  }: {
    employeeUseCases: IEmployeeUseCase;
  }) {
    return async (req: IRequest) => {
      const businessId = req.params.businessId;
      const username = req.params.username;
      const employeeBody = req.body;
      validateBody(employeeBody, ["email", "role"]);
  
      const updated = await employeeUseCases.editEmployee({ businessId, username, ...employeeBody });
  
      const response = new ResponseCreator();
  
      if (!updated) {
        return response.setStatusCode(404).setMessage("Employee not found");
      }
  
      return response.setMessage("Employee updated").setStatusCode(200);
    };
  }