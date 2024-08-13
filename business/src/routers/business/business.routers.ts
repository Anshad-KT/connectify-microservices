import { IRequest, makeCallback } from "@express-assist/connectify";
import { Router } from "express";
import { IBusinessController } from "../../interfaces/controller.interface";

export default function BuildBusinessRoutes({
    router,businessControllers
}:{
    router:Router
    businessControllers:IBusinessController,
}){
    router.post("/", makeCallback(businessControllers.createBusiness)); 
    router.get('/:businessId', makeCallback(businessControllers.getBusiness)) 
    router.put('/:businessId', makeCallback(businessControllers.editBusiness))
    router.delete('/:businessId', makeCallback(businessControllers.deleteBusiness))
   
    return router
}

