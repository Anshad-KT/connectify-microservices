import { IAuthController, IUserController } from "../interfaces/controller.interface.js"
import buildSignInController from "./auth/signin.controller.js"
import buildSignUpController from "./auth/signup.controller.js"
import {authUseCases,userUseCases} from '../use-cases/index.js'
import buildChangePasswordController from "./user/change-password.controller.js"
import buildGetProfileController from "./user/get-profile.controller.js"
import buildUpdateProfileController from "./user/update-profile.controller.js"
import buildResendCodeController from "./auth/resend-code.controller.js"


const signIn = buildSignInController({
    authUseCases
})

const signUp = buildSignUpController({
    authUseCases
})

const resendCode = buildResendCodeController({
    authUseCases
})

const changePassword = buildChangePasswordController({
    userUseCases
})

const getProfile = buildGetProfileController({
    userUseCases
})

const updateProfile = buildUpdateProfileController({
    userUseCases
})

export const authControllers: IAuthController = Object.freeze({
    signIn,signUp,resendCode
})

export const userControllers: IUserController = Object.freeze({
    getProfile,updateProfile,changePassword
})

