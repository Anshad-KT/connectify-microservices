import { AnErrorOccurredError, IRequest, UserNotFoundError, validateBody } from "@express-assist/connectify";
import { IAuthUseCase } from "../../interfaces/use-case.interface.js";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";
import { IMailService } from "../../lib/send-verification-mail.js";
import { IGenerateVerificationCode } from "../../interfaces/lib.interface.js";

export default function buildResendCodeUseCase({
    databaseRepository, mailService, generateCode
}: {
    databaseRepository:IDatabaseRepository, mailService: IMailService, generateCode: IGenerateVerificationCode
}) {
    return async ({ email }: { email: string }) => {
        const user = await databaseRepository.findByEmail(email);
        if (!user) throw new UserNotFoundError();

        const generatedCode = generateCode();

        const verificationCode = await databaseRepository.addverificationCode({
            code: generatedCode,
            user: user.id,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000) // Set expiration time to 5 minutes from now
        });

        if (!verificationCode) throw new AnErrorOccurredError();

        await mailService.sendVerificationCodeMail({
            email: user.email,
            code: verificationCode.code,
            name: user.name,
        });
    };
}







