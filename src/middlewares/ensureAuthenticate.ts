
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'



interface I_payload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request, 
  res: Response, 
  next: NextFunction) {
    const authToken = req.headers.authorization
    // if (!authToken) { return res.status(401).json({ message: 'Faltando token de autenticação' }) }
    if (!authToken) { return res.status(401).end() }

    const [, token] = authToken.split(' ')
    // console.log(token)
    try {
      const { sub } = verify(token, 'afbd8086a8e413cfdb934be664968c99') as I_payload
      
      req.user_id = sub
      
      return next()
    } catch(err) { return res.status(401).end() }
}