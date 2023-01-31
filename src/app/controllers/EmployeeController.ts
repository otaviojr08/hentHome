import { Request, Response } from 'express'
import { Employee } from '../models/Employee'
import { Controller } from './Controller'

export class EmployeeController implements Controller {
  private static _instance: EmployeeController | null = null
  
  private constructor(){
  }

  public static getInstance(): EmployeeController {
    if(EmployeeController._instance === null) {
      EmployeeController._instance = new EmployeeController()
    }

    return EmployeeController._instance
  }

  public async createElement(req: Request, res: Response): Promise<Response> {
    try { 
      const employeeObj = new Employee()

      if(await employeeObj.isRegistered(null, req.body['email']))
        throw { message: 'employee already registered', status: 400 }
      
      const result = await employeeObj.create(req.body)

      return res.json(result)
    } catch(err: any) {
      if(!err.hasOwnProperty('status')){
        err = {message: err, status: 500}
      }
      console.error(err.message)
      return res.status(err.status).json('OK')
    }
  }

  public async readElement(req: Request, res: Response): Promise<Response> {
    try { 
      const employeeObj = new Employee()
      const result = await employeeObj.getAllEmployees()

      return res.json(result)
    } catch(err: any) {
      if(!err.hasOwnProperty('status')){
        err = {message: err, status: 500}
      }
      console.error(err.message)
      return res.status(err.status).json('OK')
    }
  }
  
  public async updateElement(req: Request, res: Response): Promise<Response> {
    try { 
      const employeeObj = new Employee()
      const { id } = req.params

      if(!await employeeObj.isRegistered(id, null))
        throw { message: 'employee not found', status: 404 }
      
      const result = await employeeObj.updateEmployeeById(id, req.body)

      return res.json(result)
    } catch(err: any) {
      if(!err.hasOwnProperty('status')){
        err = {message: err, status: 500}
      }
      console.error(err.message)
      return res.status(err.status).json('OK')
    }
  }

  public async deleteElement(req: Request, res: Response): Promise<Response> {
    try { 
      const employeeObj = new Employee()
      const { id } = req.params

      if(!await employeeObj.isRegistered(id, null))
        throw { message: 'employee not found', status: 404 }
      
      await employeeObj.deleteEmployeeById(id)

      return res.json("OK")
    } catch(err: any) {
      if(!err.hasOwnProperty('status')){
        err = {message: err, status: 500}
      }
      console.error(err.message)
      return res.status(err.status).json('OK')
    }
  }
}
