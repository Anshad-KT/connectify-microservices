import { IAuthController, IUserController } from "../interfaces/controller.interface.js"
import buildSignInController from "./auth/signin.controller.js"
import buildSignOutController from "./auth/signout.controller.js"
import buildSignUpController from "./auth/signup.controller.js"

import buildChangePasswordController from "./user/change-password.controller.js"
import buildGetProfileController from "./user/get-profile.controller.js"
import buildUpdateProfileController from "./user/update-profile.controller.js"


const signIn = buildSignInController({
    authUseCases
})

const signUp = buildSignUpController({
    authUseCases
})


const changePassword = buildChangePasswordController({
    userUsecases
})

const getProfile = buildGetProfileController({
    userUsecases
})

const updateProfile = buildUpdateProfileController({
    userUsecases
})

export const authControllers: IAuthController = Object.freeze({
    signIn,signUp
})

export const userControllers: IUserController = Object.freeze({
    getProfile,updateProfile,changePassword
})

