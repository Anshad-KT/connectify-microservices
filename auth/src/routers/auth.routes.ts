import { makeCallback } from "@express-assist/connectify";
import { Router } from "express";
import { IAuthController } from "../interfaces/controller.interface.js";

export default function BuildAuthRoutes({
    router,authControllers
}:{
    router:Router
    authControllers:IAuthController,
}){
    router.post("/sign-up", makeCallback(authControllers.signUp));  
    router.post('/sign-in', makeCallback(authControllers.signIn));
    return router
}