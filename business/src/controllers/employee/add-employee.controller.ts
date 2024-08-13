import { IRequest, ResponseCreator, validateBody } from "@express-assist/connectify";
import { IEmployeeUseCase } from "../../interfaces/use-case.interface.js";

export default function buildAddEmployeeController({
    employeeUseCases,
  }: {
    employeeUseCases: IEmployeeUseCase;
  }) {
    return async (req: IRequest) => {
      const businessId = req.params.businessId;
      const employeeBody = req.body;
      validateBody(employeeBody, ["userId", "role"]);
  
      const createdEmployee = await employeeUseCases.addEmployee({ businessId, ...employeeBody });
  
      const response = new ResponseCreator();
  
      return response.setData(createdEmployee).setStatusCode(201);
    };
  }