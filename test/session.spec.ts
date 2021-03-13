import test from 'japa'
import supertest from 'supertest'
import { UserFactory } from 'Database/factories'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Session', () => {
  test('it should return JWT token when session created', async (assert) => {
    const userPayload = {
      email: 'admin@teste.com',
      password: 'adms1234',
    }

    const response = await supertest(BASE_URL).post('/sessions').send(userPayload).expect(200)
    const { token } = response.body

    assert.exists(token)
  })

  test('it should return the user information when session created', async (assert) => {
    const userPayload = {
      email: 'admin@teste.com',
      password: 'adms1234',
    }

    const response = await supertest(BASE_URL).post('/sessions').send(userPayload).expect(200)
    const { user } = response.body

    assert.exists(user)
  })


})
