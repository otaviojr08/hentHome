import { Request, Response } from 'express'
import { Contract } from '../models/Contract'
import { Controller } from './Controller'

export class ContractController implements Controller {
  private static _instance: ContractController | null = null
  
  private constructor(){
  }

  public static getInstance(): ContractController {
    if(ContractController._instance === null) {
      ContractController._instance = new ContractController()
    }

    return ContractController._instance
  }

  public async createElement(req: Request, res: Response): Promise<Response> {
    try { 
      const contractObj = new Contract()
      
      const result = await contractObj.create(req.body)

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
      const contractObj = new Contract()
      const result = await contractObj.getAllContracts()

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
      const contractObj = new Contract()
      const { id } = req.params
      
      if(!await contractObj.isRegistered(id, null))
        throw { message: 'contract not found', status: 404 }
              
      const result = await contractObj.updateContractById(id, req.body)

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
      const contractObj = new Contract()
      const { id } = req.params

      if(!await contractObj.isRegistered(id, null))
        throw { message: 'contract not found', status: 404 }
      
      await contractObj.deleteContractById(id)

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
