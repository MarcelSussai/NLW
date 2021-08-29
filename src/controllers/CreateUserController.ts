import { Request, response, Response } from 'express'
import { CreateUserService } from '../services/CreateUserService'


class CreateUserController {

  async handle(req: Request, res: Response) {
    // try {
      const { name, email, admin, password } = req.body
  
      const createUserService = new CreateUserService()
  
      const user = await createUserService.execute({name, email, admin, password})
  
      return res.json(user)
    // } catch(err) {
    //   console.log(err)
      
    //   return res.status(400).json({
    //     error: err.message
    //   })
    // }
  }

}

export { CreateUserController }