import { Request, Response } from 'express'
import { Employee } from '../models/Employee'

export class AuthController {
  private static _instance: AuthController | null = null
  
  private constructor(){
  }

  public static getInstance(): AuthController {
    if(AuthController._instance === null) {
      AuthController._instance = new AuthController()
    }

    return AuthController._instance
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const employeeObj = new Employee();
      const { email, password } = req.body;

      if(!await employeeObj.isRegistered(null, email))
        throw { message: 'email not found in database', status: 400 }
      
      const isLogged = await employeeObj.auth(email, password);

      if(!isLogged)
        return res.status(401).json('OK')
    
      return res.json('OK');
    } catch(err: any) {
      if(!err.hasOwnProperty('status')){
        err = {message: err, status: 500}
      }
      console.error(err.message)
      return res.status(err.status).json('OK')
    }
  }
}
