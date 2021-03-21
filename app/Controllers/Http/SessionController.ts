import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ValidationException from 'App/Exceptions/ValidationException'
import User from 'App/Models/User'
import SessionValidator from 'App/Validators/Session/StoreValidator'


export default class SessionsController {
  public async store ({ request, response, auth }: HttpContextContract) {
    try {
      await request.validate(SessionValidator)
    } catch (error) {
      throw new ValidationException(error.messages)
    }

    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)

    const userResponse = user?.serialize({
      fields: ['id', 'nickname', 'email']
    })

    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '7 days'
      })

      return response.send({ user: userResponse, token})
    } catch (error) {
      return response.status(401).send({ message: "We were unable to authenticate you."})
    }
  }
}
