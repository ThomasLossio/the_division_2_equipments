import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'


export default class SessionsController {
  public async store ({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)

    const userResponse = user?.serialize({
      fields: ['id', 'nickname', 'email']
    })

    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '7 days'
    })

    return response.send({ user: userResponse, token})
  }
}
