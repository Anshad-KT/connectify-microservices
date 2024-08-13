import { makeCallback } from "@express-assist/connectify";
import { Router } from "express";
import { IEmployeeController }  from "../../interfaces/controller.interface";

export default function BuildBusinessRoutes({
    router,employeeControllers
}:{
    router:Router
    employeeControllers:IEmployeeController,
}){
    router.get('/:businessId/employees', makeCallback(employeeControllers.getAllEmployees));
    router.get('/:businessId/employees/:username', makeCallback(employeeControllers.getEmployee));
    router.post('/:businessId/employees', makeCallback(employeeControllers.addEmployee));
    router.put('/:businessId/employees/:username', makeCallback(employeeControllers.editEmployee));
    router.delete('/:businessId/employees/:username', makeCallback(employeeControllers.deleteEmployee));
    
    return router;
    
}