import { Request, Response } from 'express'

export abstract class Controller {
  public abstract createElement(req: Request, res: Response): Promise<Response>
  public abstract readElement(req: Request, res: Response): Promise<Response> 
  public abstract updateElement(req: Request, res: Response): Promise<Response> 
  public abstract deleteElement(req: Request, res: Response): Promise<Response> 
}