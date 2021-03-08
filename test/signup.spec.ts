import test from 'japa'
import supertest from 'supertest'
import { UserFactory } from 'Database/factories'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Sign Up', () => {
  test('it should be able to sign up', async (assert) => {
    const userPayload = {
      password: '123456',
    }

    const user = await UserFactory.merge(userPayload).makeStubbed()
    const response = await supertest(BASE_URL).post('/users').send(user)

    console.log(user)
    assert.exists(response)
  })
})
