import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'

import './database'
import { router } from './routes'

const app = express()
app.use(cors())

app.use(express.json())
app.use(router)
app.use((
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction) => {
    if(err instanceof Error) {
      return res.status(400).json({
        error: err.message
      })
    }

    return res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    })
})



const port = 21143
app.listen(port, () => console.log(`Rodando na porta ${port}`))