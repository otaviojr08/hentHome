import { Request, Response } from 'express'
import { House } from '../models/House'
import { Controller } from './Controller'

export class HouseController implements Controller {
  private static _instance: HouseController | null = null
  
  private constructor(){
  }

  public static getInstance(): HouseController {
    if(HouseController._instance === null) {
      HouseController._instance = new HouseController()
    }

    return HouseController._instance
  }

  public async createElement(req: Request, res: Response): Promise<Response> {
    try { 
      const houseObj = new House()
      
      const result = await houseObj.create(req.body)

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
      const houseObj = new House()
      const result = await houseObj.getAllHouses()

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
      const houseObj = new House()
      const { id } = req.params
      
      if(!await houseObj.isRegistered(id, null))
        throw { message: 'house not found', status: 404 }
              
      const result = await houseObj.updateHouseById(id, req.body)

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
      const houseObj = new House()
      const { id } = req.params

      if(!await houseObj.isRegistered(id, null))
        throw { message: 'house not found', status: 404 }
      
      await houseObj.deleteHouseById(id)

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
