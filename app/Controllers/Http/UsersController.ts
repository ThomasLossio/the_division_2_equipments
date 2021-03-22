import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ValidationException from 'App/Exceptions/ValidationException'
import User from 'App/Models/User'
import UserStoreValidator from 'App/Validators/User/StoreValidator'

export default class UsersController {
  public async index ({}: HttpContextContract) {
  }

  public async store ({ request, response }: HttpContextContract) {
    try {
      await request.validate(UserStoreValidator)
    } catch (error) {
      throw new ValidationException(error.messages)
    }

    const data = request.only(['nickname', 'email', 'password'])

    const user = await User.create(data)

    return response.status(201).send(user)
  }

  public async show ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
