import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Sign Up', () => {
  test('it should be able to sign up', async (assert) => {
    const userPayload = {
      password: '123456',
      password_confirmation: '123456',
    }
    const response = await supertest(BASE_URL).post('/users').send()
  })
})
