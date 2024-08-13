import { BadRequestError, IRequest, ResponseCreator, UnauthorizedError, validateBody } from "@express-assist/connectify";
import { IUserUseCase } from "../../interfaces/use-case.interface.js";

export default function buildGetProfileController({
    userUseCases
}: {
    userUseCases:IUserUseCase
}) {
    return async(req:IRequest) => {
        const currentUser = req.currentUser;
        const username = req.params.username;

        if (!username) throw new BadRequestError();
        if (currentUser.username !== username) throw new UnauthorizedError();
        
        const userDetails = await userUseCases.getProfile({
            username,
        })
    
        const response = new ResponseCreator();
        return response.setData(userDetails).setStatusCode(200);
    
    }
}