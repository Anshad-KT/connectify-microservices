import { IRequest, ResponseCreator, validateBody } from "@express-assist/connectify";
import { IEmployeeUseCase } from "../../interfaces/use-case.interface.js";

export default function buildGetEmployeeController({
    employeeUseCases,
  }: {
    employeeUseCases: IEmployeeUseCase;
  }) {
    return async (req: IRequest) => {
      const businessId = req.params.businessId;
      const username = req.params.username;
  
      const employee = await employeeUseCases.getEmployee({ businessId, username });
  
      const response = new ResponseCreator();
  
      if (!employee) {
        return response.setStatusCode(404).setMessage("Employee not found");
      }
  
      return response.setData(employee).setStatusCode(200);
    };
  }