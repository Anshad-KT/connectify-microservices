import { IRequest, ResponseCreator, validateBody } from "@express-assist/connectify"
import { IUser } from "../../interfaces/entity.interface.js"
import { IAuthUseCase } from "../../interfaces/use-case.interface.js"

export default function buildSignUpController({
    authUseCases
}: {
    authUseCases:IAuthUseCase
}) {
    return async(req:IRequest) => {
        const userData:IUser = req.body
        validateBody(userData,["email","username","password","name"])

        await authUseCases.signUp({
            username: userData.username,
            email: userData.email,
            password: userData.password,
            name: userData.name,
            avatar: userData.avatar
        });

        const response = new ResponseCreator();
        return response
            .setStatusCode(201)
            .setMessage("Please check your mail for verification code");
    }
}