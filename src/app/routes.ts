import { Router } from 'express'
import UserController from './controllers/UserController'
import { EmployeeController } from './controllers/EmployeeController'
import { ClientController } from './controllers/ClientController'
import { HouseController } from './controllers/HouseController'

const routes = Router()
const Employee = EmployeeController.getInstance()
const Client = ClientController.getInstance()
const House = HouseController.getInstance()

// users
routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

// employees
routes.post('/employee/create', Employee.createElement)
routes.get('/employee/read', Employee.readElement)
routes.put('/employee/:id/update', Employee.updateElement)
routes.delete('/employee/:id/delete', Employee.deleteElement)

// clients
routes.post('/client/create', Client.createElement)
routes.get('/client/read', Client.readElement)
routes.put('/client/:id/update', Client.updateElement)
routes.delete('/client/:id/delete', Client.deleteElement)

// houses
routes.post('/house/create', House.createElement)
routes.get('/house/read', House.readElement)
routes.put('/house/:id/update', House.updateElement)
routes.delete('/house/:id/delete', House.deleteElement)

export default routes
