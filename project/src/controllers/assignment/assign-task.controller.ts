import { 
    IRequest, 
    ResponseCreator, 
    validateBody, 
    BadRequestError 
  } from "@express-assist/connectify";
import { IAssignmentsUseCase } from "../../interfaces/usecase.interface";
  
  export default function buildAssignTaskController({
    assignmentsUseCases,
  }: {
    assignmentsUseCases: IAssignmentsUseCase;
  }) {
    return async (req: IRequest) => {
      const assignmentInput = req.body;
      validateBody(assignmentInput, [
        "taskId",
        "userId",
      ]);
      const updatedTask = await assignmentsUseCases.assignTask(assignmentInput);
      const response = new ResponseCreator();
      return response.setData(updatedTask).setStatusCode(200);
    };
  }