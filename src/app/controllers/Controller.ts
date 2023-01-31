import { Request, Response } from 'express'

export interface Controller {
  createElement(req: Request, res: Response): Promise<Response>
  readElement(req: Request, res: Response): Promise<Response> 
  updateElement(req: Request, res: Response): Promise<Response> 
  deleteElement(req: Request, res: Response): Promise<Response> 
}