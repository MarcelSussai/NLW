import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from 'jsonwebtoken'

import { UsersRepositories } from "../repositories/UsersRepositories"



interface I_AuthenticateRequest {
  email: string
  password: string
}

class AuthenticateUserService {

  async execute({email, password}: I_AuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({ email })

    if (!user) { throw new Error("Email/Senha incorreto") }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) { throw new Error("Email/Senha incorreto") }

    const token = sign({
      email: user.email
    }, 'afbd8086a8e413cfdb934be664968c99', {
      subject:    user.id,
      expiresIn:  '1d'
    })

    return token
  }
}

export { AuthenticateUserService }