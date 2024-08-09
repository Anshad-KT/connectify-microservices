import { AnErrorOccurredError, ConflictError } from "@express-assist/connectify";
import { IUser, IUserEntity, IUserEntityConstructor } from "../../interfaces/entity.interface.js";
import { IGenerateVerificationCode } from "../../interfaces/lib.interface.js";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";
import IPasswordHash from "../../lib/password-hash.interface.js";
import { IMailService } from "../../lib/send-verification-mail.js";

export default function buildSignUpUseCase({
    UserEntity,
    databaseRepository,
    generateCode,
    passwordHash
    , mailService
}: {
    databaseRepository: IDatabaseRepository
    passwordHash: IPasswordHash
    generateCode: IGenerateVerificationCode
    mailService: IMailService
    UserEntity: IUserEntityConstructor
    
}) {
    return async (userData: IUser) => {
        const userEntity = new UserEntity(userData)
        userEntity.validate()
        const user = userEntity.get();

        const userWithSameMail = await databaseRepository.findByEmail(user.email);
        if (userWithSameMail) {
            throw new ConflictError("Email already registered");
        }

        const userWithSameUsername = await databaseRepository.findByUsername(
            user.username
        );
        if (userWithSameUsername) {
            throw new ConflictError("Username already registered");
        }

        const hashedPassword = await passwordHash.hash(user.password);
        if (!hashedPassword) throw new AnErrorOccurredError();

        const isUserCreated = await databaseRepository.addUser({
            ...user,
            password: hashedPassword,
        });
        if (!isUserCreated) throw new AnErrorOccurredError();

        const generatedCode = generateCode();

        const verificationCode = await databaseRepository.addverificationCode({
            code: generatedCode,
            user: isUserCreated.id,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000) // Set expiration time to 5 minutes from now
        });

        if (!verificationCode) {
            throw new AnErrorOccurredError();
        }

        await mailService.sendVerificationCodeMail({
            email: user.email,
            code: verificationCode.code,
            name: user.name,
        });

        return user;
    }
}