import { Router } from 'express'
import UserController from './controllers/UserController'
import { EmployeeController } from './controllers/EmployeeController'

const routes = Router()
const Employee = EmployeeController.getInstance()

// users
routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

// employees
routes.post('/employee/create', Employee.createElement)
routes.get('/employee/read', Employee.readElement)
routes.put('/employee/:id/update', Employee.updateElement)
routes.delete('/employee/:id/delete', Employee.deleteElement)

export default routes
