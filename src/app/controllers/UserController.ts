import { Request, Response } from 'express'
import { User } from '../models/User'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await User.find()
    
    users.forEach(user => console.log(user.fullName()))

    return res.json(users)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    try{
      const user = await User.create(req.body)
      
      return res.json(user)
    } catch(err){
      return res.json(err);
    }
  }
}

export default new UserController()