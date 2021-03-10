import { Hash } from '@adonisjs/core/build/standalone'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import hash from '@ioc:Adonis/Core/Hash'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await User.create({
      email: 'admin@teste.com',
      password: 'adms1234',
      nickname: 'meunick',
      remember_me_token: ''
    })
  }
}
