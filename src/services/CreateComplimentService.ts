import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories"


interface I_ComplimentRequest {
  tag_id: string
  user_sender: string
  user_receiver: string
  message: string
}

class CreateComplimentService {
  async execute( {
    tag_id, user_sender, user_receiver, message
  }: I_ComplimentRequest ) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
    const usersRepositories = getCustomRepository(UsersRepositories)

    if (user_sender === user_receiver) { throw new Error("Usuário Recebedor e Usuário requisidor são iguais") }

    const userReceiverExists = await usersRepositories.findOne(user_receiver)

    if (!userReceiverExists) { throw new Error('Usuário recebedor não existe') }

    const compliment = complimentsRepositories.create({ 
      tag_id,
      user_receiver,
      user_sender,
      message
    })

    await complimentsRepositories.save(compliment)
    return compliment
  }
}

export { CreateComplimentService }