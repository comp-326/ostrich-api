/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../src/app/index')

describe('Should return 200', () => {
	it('Get some value', () => {
		const res = request(app).get('/')
		expect(res.statusCode).toBe(200)
	})
})
