import { BadRequestError, IRequest, ResponseCreator, UnauthorizedError, validateBody } from "@express-assist/connectify";
import { IUserUseCase } from "../../interfaces/use-case.interface.js";

export default function buildChangePasswordController({
    userUsecases
}: {
    userUsecases:IUserUseCase
}) {
   return async(req:IRequest) => {
    const currentUser = req.currentUser;
    const username = req.params.username;
    
    if (!username) throw new BadRequestError();
    if (currentUser.username !== username) throw new UnauthorizedError();
    
    const userInput = req.body

    validateBody(userInput, ["currentPassword","newPassword"])

    await userUsecases.changePassword({
        username,
        currentPassword: userInput.currentPassword,
        newPassword: userInput.newPassword
    })

    const response = new ResponseCreator()
    return response.setMessage("Password Changed").setStatusCode(200)
   }
}