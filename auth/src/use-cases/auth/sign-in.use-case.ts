import { AnErrorOccurredError, ConflictError, IToken, UnauthorizedError } from "@express-assist/connectify";
import { IUser, IUserEntity, IUserEntityConstructor } from "../../interfaces/entity.interface.js";
import { IGenerateVerificationCode } from "../../interfaces/lib.interface.js";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";
import IPasswordHash from "../../lib/password-hash.interface.js";
import { IMailService } from "../../lib/send-verification-mail.js";

export default function buildSignInUseCase({
    databaseRepository,
    passwordHash,
    token
}: {
    databaseRepository: IDatabaseRepository
    passwordHash: IPasswordHash
    token: IToken<IUser>;
    
}) {
    return async (userData: IUser) => {
        

        const userFound = await databaseRepository.findByEmail(userData.email);
        if (!userFound) {
            throw new UnauthorizedError("No Account Found");
        }

        const doesPasswordMatch = await passwordHash.compare(userData.password,userFound.password);

        if (!doesPasswordMatch) throw new AnErrorOccurredError();

        

        const userToken = token.sign(userFound);

        return {
            token: userToken,
            user: userFound,
        };
    }
}