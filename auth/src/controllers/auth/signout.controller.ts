import { IRequest, ResponseCreator } from "@express-assist/connectify"
import { TOKEN_COOKIE_NAME } from "../../lib/constants.js";
import { IAuthUseCase } from "../../interfaces/use-case.interface.js";

export default function buildSignOutController({
    authUseCases
}: {
    authUseCases:IAuthUseCase
}) {
    return async(req:IRequest) => {
        const response = new ResponseCreator();
        return response
            .setHeaders({
                "Set-Cookie": `${TOKEN_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`,
            })
            .setMessage("User logged out")
            .setStatusCode(204);
    }
}