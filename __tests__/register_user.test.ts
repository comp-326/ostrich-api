/* eslint-disable @typescript-eslint/no-unused-vars */
import request from 'supertest';
import app from '@ostrich-app/app';
const url = '/api/v1';
describe('Register User', () => {
	it('Responds with a JSON data', async function (){
		await request(app)
			.post(`${url}/auth/register`)
			.send({
				email: 'Jane@gmail.com',
				password: '1234'
			})
			.expect(400);
		// .end();
	});
});
