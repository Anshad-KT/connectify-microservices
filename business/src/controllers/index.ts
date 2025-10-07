import buildCreateBusinessController from "./business/create-business.controller.js"
import buildGetBusinessController from "./business/get-business.controller.js"
import buildEditBusinessController from "./business/edit-business.controller.js"
import buildDeleteBusinessController from "./business/delete-business.controller.js"
import { businessUseCases, employeeUseCases } from '../use-cases/index.js'
import buildGetAllEmployeesController from "./employee/get-all-employees.controller.js"
import buildGetEmployeeController from "./employee/get-employee.controller.js"
import buildAddEmployeeController from "./employee/add-employee.controller.js"
import buildEditEmployeeController from "./employee/edit-employee.controller.js"
import buildDeleteEmployeeController from "./employee/delete-employee.controller.js"
import { IBusinessController, IEmployeeController } from "../interfaces/controller.interface.js"
import { KafkaProducerService } from "../services/kafka-producer.service.js"

const kafkaProducer = new KafkaProducerService();

const createBusiness = buildCreateBusinessController({
    businessUseCases,
    kafkaProducer
})

const getBusiness = buildGetBusinessController({
    businessUseCases
})

const editBusiness = buildEditBusinessController({
    businessUseCases,
    kafkaProducer
})

const deleteBusiness = buildDeleteBusinessController({
    businessUseCases
})

const getAllEmployees = buildGetAllEmployeesController({
    employeeUseCases
})

const getEmployee = buildGetEmployeeController({
    employeeUseCases
})

const addEmployee = buildAddEmployeeController({
    employeeUseCases
})

const editEmployee = buildEditEmployeeController({
    employeeUseCases
})

const deleteEmployee = buildDeleteEmployeeController({
    employeeUseCases
})

export const businessControllers: IBusinessController = Object.freeze({
    createBusiness,
    getBusiness,
    editBusiness,
    deleteBusiness
})

export const employeeControllers: IEmployeeController = Object.freeze({
    getAllEmployees,
    getEmployee,
    addEmployee,
    editEmployee,
    deleteEmployee
})