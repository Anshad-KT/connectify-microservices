import { AnErrorOccurredError, UnauthorizedError, UserNotFoundError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";
import IPasswordHash from "../../lib/password-hash.interface.js";

export default function buildChangePassowrdUseCase({
    databaseRepository,passwordHash
}: {
    databaseRepository:IDatabaseRepository
    passwordHash:IPasswordHash
}) {
    return async({
        currentPassword,
        newPassword,
        username,
    }: {
        currentPassword: string;
        newPassword: string;
        username: string;
    })  => {
        const user = await databaseRepository.findByUsername(username)
        if (!user) throw new UserNotFoundError();

        const doesPasswordMatch = await passwordHash.compare(
            currentPassword,
            user.password
        );

        if (!doesPasswordMatch) {
            throw new UnauthorizedError("Incorrect password");
        }

        const hashedNewPassword = await passwordHash.hash(newPassword);
        const passwordChanged = await databaseRepository.changePassword({id:user.id,newPassword:hashedNewPassword})
        if (!passwordChanged) throw new AnErrorOccurredError();
return passwordChanged
    }
}