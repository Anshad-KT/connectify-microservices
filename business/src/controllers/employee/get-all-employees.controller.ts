import { IRequest, ResponseCreator, validateBody } from "@express-assist/connectify";
import { IEmployeeUseCase } from "../../interfaces/use-case.interface.js";

export default function buildGetAllEmployeesController({
  employeeUseCases,
}: {
  employeeUseCases: IEmployeeUseCase;
}) {
  return async (req: IRequest) => {
    const businessId = req.params.businessId;

    const employees = await employeeUseCases.getAllEmployees({ businessId });

    const response = new ResponseCreator();

    return response.setData(employees).setStatusCode(200);
  };
}