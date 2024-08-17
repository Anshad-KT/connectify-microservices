import buildSignUpUseCase from "./auth/sign-up.use-case.js";
import { databaseRepository } from "../repository/sql/index.js";
import passwordHash from "../lib/password-hash.js";
import { generateVerificationCode } from "../lib/code-generator.js";
import { mailService } from "../lib/send-verification-mail.js";
import authEntities from "../entities/index.js";
import { IAuthUseCase, IUserUseCase } from "../interfaces/use-case.interface.js";
import { token } from "@express-assist/connectify";
import buildSignInUseCase from "./auth/sign-in.use-case.js";
import buildChangePassowrdUseCase from "./user/change-password.use-case.js";
import buildGetProfileUseCase from "./user/get-profile.use-case.js";
import buildUpdateProfileUseCase from "./user/update-profile.use-case.js";
import { uploadImageToS3 } from "../lib/file-bucket.js";
import buildResendCodeUseCase from "./auth/resend-code.use-case.js";




const changePassword = buildChangePassowrdUseCase({
    databaseRepository, passwordHash
})

const getProfile = buildGetProfileUseCase({
    databaseRepository
})

const updateProfile = buildUpdateProfileUseCase({
    databaseRepository, imageUpload: uploadImageToS3,
})
const signUp = buildSignUpUseCase({
    databaseRepository,
    passwordHash,
    generateCode: generateVerificationCode,
    mailService,
    UserEntity: authEntities.User,
})

const signIn = buildSignInUseCase({
    databaseRepository,
    passwordHash,
    token
})
const resendCode = buildResendCodeUseCase({
    databaseRepository,
    mailService,
    generateCode: generateVerificationCode,
}) 

export const authUseCases: IAuthUseCase = Object.freeze({
    signUp, signIn ,resendCode
});

export const userUseCases: IUserUseCase = Object.freeze({
    changePassword, getProfile, updateProfile
})