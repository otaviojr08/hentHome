import { Request, Response } from 'express'
import { Client } from '../models/Client'
import { Controller } from './Controller'

export class ClientController implements Controller {
  private static _instance: ClientController | null = null
  
  private constructor(){
  }

  public static getInstance(): ClientController {
    if(ClientController._instance === null) {
      ClientController._instance = new ClientController()
    }

    return ClientController._instance
  }

  public async createElement(req: Request, res: Response): Promise<Response> {
    try { 
      const clientObj = new Client()

      if(await clientObj.isRegistered(null, req.body['cpf']))
        throw { message: 'client already registered', status: 400 }
      
      const result = await clientObj.create(req.body)

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
      const clientObj = new Client()
      const result = await clientObj.getAllClients()

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
      const clientObj = new Client()
      const { id } = req.params
      
      if(!await clientObj.isRegistered(id, null))
        throw { message: 'client not found', status: 404 }
              
      const result = await clientObj.updateClientById(id, req.body)

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
      const clientObj = new Client()
      const { id } = req.params

      if(!await clientObj.isRegistered(id, null))
        throw { message: 'client not found', status: 404 }
      
      await clientObj.deleteClientById(id)

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
