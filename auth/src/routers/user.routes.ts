import { IVerifyUserMiddleware, makeCallback, verifyUserMiddleware } from "@express-assist/connectify";
import { Router } from "express";
import { IUserController } from "../interfaces/controller.interface.js";

export default function BuildUserRoutes({
    router, verifyUser, userControllers
}: {
    router: Router
    verifyUser: IVerifyUserMiddleware
    userControllers: IUserController,
}) {
    router.get("/profile/:username", verifyUser, makeCallback(userControllers.getProfile));
    router.put('/profile/:username', verifyUser, makeCallback(userControllers.updateProfile));
    router.post("/change-password", verifyUser, makeCallback(userControllers.changePassword));
    return router

}