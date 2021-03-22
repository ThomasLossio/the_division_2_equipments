import test from 'japa'
import supertest from 'supertest'
import { UserFactory } from 'Database/factories'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Sign up', () => {
  test('it should be able to sign up', async () => {
    const userPayload = {
      password: '123456'
    }

    const user = await UserFactory.merge(userPayload).makeStubbed()
    await supertest(BASE_URL).post('/users').send({
      nickname: user.nickname,
      email: user.email,
      password: userPayload.password,
      password_confirmation: userPayload.password
    }).expect(201)
  })

  test('it should not be able to sign up without a nickname', async (assert) => {
    const userPayload = {
      nickname: '',
      password: '123456'
    }

    const user = await UserFactory.merge(userPayload).makeStubbed()
    const response = await supertest(BASE_URL).post('/users').send({
      nickname: user.nickname,
      email: user.email,
      password: userPayload.password,
      password_confirmation: userPayload.password
    }).expect(400)

    const { errors } = response.body
    assert.deepEqual(errors, [
      {
        rule: "required",
        field: "nickname",
        message: "required validation failed"
      }
    ])
  })

  test('it should not be able to sign up without an email', async (assert) => {
    const userPayload = {
      email: '',
      password: '123456'
    }

    const user = await UserFactory.merge(userPayload).makeStubbed()
    const response = await supertest(BASE_URL).post('/users').send({
      nickname: user.nickname,
      email: user.email,
      password: userPayload.password,
      password_confirmation: userPayload.password
    }).expect(400)

    const { errors } = response.body
    assert.deepEqual(errors, [
      {
        rule: "required",
        field: "email",
        message: "required validation failed"
      }
    ])
  })

  test('it should not be able to sign up without a valid email', async (assert) => {
    const userPayload = {
      email: 'teste@',
      password: '123456'
    }

    const user = await UserFactory.merge(userPayload).makeStubbed()
    const response = await supertest(BASE_URL).post('/users').send({
      nickname: user.nickname,
      email: user.email,
      password: userPayload.password,
      password_confirmation: userPayload.password
    }).expect(400)

    const { errors } = response.body
    assert.deepEqual(errors, [
      {
        rule: "email",
        field: "email",
        message: "email validation failed"
      }
    ])
  })

  test('it should not be able to sign up without a duplicated email', async (assert) => {
    const userPayload = {
      password: '123456'
    }

    const user = await UserFactory.merge(userPayload).create()
    const response = await supertest(BASE_URL).post('/users').send({
      nickname: user.nickname,
      email: user.email,
      password: userPayload.password,
      password_confirmation: userPayload.password
    }).expect(400)

    const { errors } = response.body
    assert.deepEqual(errors, [
      {
        rule: "unique",
        field: "email",
        message: "unique validation failure"
      }
    ])
  })

  test('it should not be able to sign up without a password', async (assert) => {
    const userPayload = {
      password: ''
    }

    const user = await UserFactory.merge(userPayload).makeStubbed()
    const response = await supertest(BASE_URL).post('/users').send({
      nickname: user.nickname,
      email: user.email,
      password: userPayload.password,
      password_confirmation: userPayload.password
    }).expect(400)

    const { errors } = response.body
    assert.deepEqual(errors, [
      {
        rule: "required",
        field: "password",
        message: "required validation failed"
      }
    ])
  })

  test('it should not be able to sign up without a password confirmation', async (assert) => {
    const userPayload = {
      password: '123456'
    }

    const user = await UserFactory.merge(userPayload).makeStubbed()
    const response = await supertest(BASE_URL).post('/users').send({
      nickname: user.nickname,
      email: user.email,
      password: userPayload.password
    }).expect(400)

    const { errors } = response.body
    assert.deepEqual(errors, [
      {
        rule: "confirmed",
        field: "password_confirmation",
        message: "confirmed validation failed"
      }
    ])
  })

  test('it should not be able to sign up without a wrong password confirmation', async (assert) => {
    const userPayload = {
      password: '123456'
    }

    const user = await UserFactory.merge(userPayload).makeStubbed()
    const response = await supertest(BASE_URL).post('/users').send({
      nickname: user.nickname,
      email: user.email,
      password: userPayload.password,
      password_confirmation: '1234567'
    }).expect(400)

    const { errors } = response.body
    assert.deepEqual(errors, [
      {
        rule: "confirmed",
        field: "password_confirmation",
        message: "confirmed validation failed"
      }
    ])
  })

  test('it should not be able to sign up with a password of less than 6 characters', async (assert) => {
    const userPayload = {
      password: '12345'
    }

    const user = await UserFactory.merge(userPayload).makeStubbed()
    const response = await supertest(BASE_URL).post('/users').send({
      nickname: user.nickname,
      email: user.email,
      password: userPayload.password,
      password_confirmation: userPayload.password
    }).expect(400)

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

})
