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

  test('it should not be able to sign in without an email address', async (assert) => {
    const userPayload = {
      email: '',
      password: 'adms1234',
    }

    const response = await supertest(BASE_URL).post('/sessions').send(userPayload).expect(400)
    const { errors } = response.body
    assert.deepEqual(errors, [
      {
        rule: "required",
        field: "email",
        message: "required validation failed"
      }
    ])
  })

  test('it should not be able to sign in without a valid email', async (assert) => {
    const userPayload = {
      email: 'teste',
      password: 'adms1234',
    }

    const response = await supertest(BASE_URL).post('/sessions').send(userPayload).expect(400)
    const { errors } = response.body
    assert.deepEqual(errors, [
      {
        rule: "email",
        field: "email",
        message: "email validation failed"
      }
    ])
  })

  test('it should not be able to sign in without a password', async (assert) => {
    const userPayload = {
      email: 'admin@teste.com',
      password: '',
    }

    const response = await supertest(BASE_URL).post('/sessions').send(userPayload).expect(400)
    const { errors } = response.body
    assert.deepEqual(errors, [
      {
        rule: "required",
        field: "password",
        message: "required validation failed"
      }
    ])
  })

  test('it should not be able to sign in without a password of less than 6 characters', async (assert) => {
    const userPayload = {
      email: 'admin@teste.com',
      password: 'ab',
    }

    const response = await supertest(BASE_URL).post('/sessions').send(userPayload).expect(400)
    const { errors } = response.body
    assert.deepEqual(errors, [
      {
        rule: "minLength",
        field: "password",
        message: "minLength validation failed",
        args: {
          minLength: 6
        }
      }
    ])
  })

  test('it should not be able to sign in with a user that does not exist', async (assert) => {
    const userPayload = {
      password: 'adms1234'
    }

    const user = await UserFactory.merge(userPayload).make();

    const response = await supertest(BASE_URL).post('/sessions').send(user.$attributes).expect(401)
    const { message } = response.body
    assert.equal(message, 'We were unable to authenticate you.')
  })

  test('it should not be able to sign in with a user with a wrong password', async (assert) => {
    const userPayload = {
      email: 'admin@teste.com',
      password: '123456'
    }

    const response = await supertest(BASE_URL).post('/sessions').send(userPayload).expect(401)
    const { message } = response.body
    assert.equal(message, 'We were unable to authenticate you.')
  })


})
