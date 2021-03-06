import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Welcome', () => {
  test('ensure home page works', async (assert) => {
    /**
     * Make request
     */
    const response = await supertest(BASE_URL).get('/').expect(200)
    const { hello } = response.body

    assert.exists(hello)
    assert.equal(hello.trim(), 'world')
  })
})
