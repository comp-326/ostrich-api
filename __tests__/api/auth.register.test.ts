import app from '../../src/app'
import request from 'supertest'
// import mongoose from 'mongoose'

jest.setTimeout(30000)
jest.mock('mongoose')

describe('Regist', () => {
	it('Should return error', async () => {
		const res = await request(app)
			.post('/v1/auth/login')
			.send({ email: 'Jane', password: '38129Orinda****' })
		expect(res.statusCode).toThrowError()
	})
})
