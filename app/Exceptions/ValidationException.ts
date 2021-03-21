import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new ValidateException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ValidationException extends Exception {
  constructor(message: string) {
    super(message, 400)
  }

  public async handle (error: this, { response }: HttpContextContract) {
    return response.status(error.status).send(error.message);
  }
}
